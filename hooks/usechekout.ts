// hooks/usechekout.ts
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useCart } from "@/hooks/useCart";
import type { OrderDTO, ProductOrderDto } from "@/interfaces/orders";
import { useUserFromToken } from "@/hooks/useUserFromToken";

export function useCheckout() {
  const { productos: cartProducts, clear } = useCart();
  const { user } = useUserFromToken();

  // API state
  const [mensaje, setMensaje] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  // FORM state (moved from component)
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // "credit" | "debit" | "transfer"
  const [cardNumber, setCardNumber] = useState<string>(""); // formatted groups
  const [expiry, setExpiry] = useState<string>(""); // MM/YY
  const [cvv, setCvv] = useState<string>("");

  // local messages & timeout handling
  const [localMsg, setLocalMsg] = useState<string>("");
  const [localType, setLocalType] = useState<"error" | "warning" | "info">("info");
  const msgTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (msgTimeoutRef.current) window.clearTimeout(msgTimeoutRef.current);
    };
  }, []);

  const _buildProductDto = (p: any): ProductOrderDto | null => {
    const productid = Number(p.product_id ?? p.productId ?? p.id ?? p._id ?? p.productid);
    const quantity = Number(p.cantidad ?? p.quantity ?? p.qty ?? 1);

    if (!Number.isFinite(productid) || productid < 1 || !Number.isFinite(quantity) || quantity <= 0) {
      return null;
    }

    // NOTE: ProductOrderDto on backend expects { id, quantity }. We'll map later.
    return { id: productid, quantity };
  };

  // ---------- Helpers ----------
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 19);
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : digits;
  };

  const handleCardNumberChange = (val: string) => setCardNumber(formatCardNumber(val));

  const handleExpiryChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) setExpiry(digits);
    else setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
  };

  const handleCvvChange = (val: string) => setCvv(val.replace(/\D/g, "").slice(0, 4));

  const clearLocalMsgTimer = () => {
    if (msgTimeoutRef.current) {
      window.clearTimeout(msgTimeoutRef.current);
      msgTimeoutRef.current = null;
    }
  };

  const showLocalMsg = (msg: string, type: "error" | "warning" | "info" = "info", timeoutMs = 5000) => {
    clearLocalMsgTimer();
    setLocalMsg(msg);
    setLocalType(type);
    msgTimeoutRef.current = window.setTimeout(() => {
      setLocalMsg("");
      msgTimeoutRef.current = null;
    }, timeoutMs);
  };

  // Luhn algorithm for card validation
  const luhnCheck = (num: string) => {
    const digits = num.replace(/\D/g, "");
    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = parseInt(digits.charAt(i), 10);
      if (shouldDouble) {
        d = d * 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateCardFields = () => {
    const digits = cardNumber.replace(/\s+/g, "");
    if (!/^\d{12,19}$/.test(digits)) {
      showLocalMsg("Número de tarjeta inválido. Entre 13 y 19 dígitos.", "error");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      showLocalMsg("Fecha inválida. Usa MM/AA.", "error");
      return false;
    }
    const [mmStr, yyStr] = expiry.split("/");
    const mm = Number(mmStr);
    const yy = Number(yyStr);
    if (isNaN(mm) || isNaN(yy) || mm < 1 || mm > 12) {
      showLocalMsg("Mes inválido.", "error");
      return false;
    }
    const now = new Date();
    const currentYear = Number(String(now.getFullYear()).slice(-2));
    const currentMonth = now.getMonth() + 1;
    if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      showLocalMsg("La tarjeta está vencida.", "error");
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      showLocalMsg("CVV inválido.", "error");
      return false;
    }
    return true;
  };

  // ---------- Network: createOrder ----------
  const createOrder = async (payment_method_backend: string, extra: Record<string, unknown> = {}) => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setMensaje("");
    clearLocalMsgTimer();
    setLocalMsg("");

    try {
      const user_id_raw = user?.user_id ?? null;
      if (!user_id_raw) {
        showLocalMsg("Usuario no autenticado. Inicia sesión para crear la orden.", "error");
        setLoading(false);
        throw new Error("Usuario no autenticado");
      }

      const user_id = String(user_id_raw).slice(0, 255); // backend expects string

      const productosArray = cartProducts ?? [];
      const productsIntermediate = productosArray.map(_buildProductDto);
      const productsMapped = productsIntermediate
        .filter((x): x is ProductOrderDto => x !== null)
        .map((p) => ({ id: (p as any).id, quantity: (p as any).quantity }));

      if (!productsMapped.length) {
        showLocalMsg("El carrito está vacío o no contiene productos válidos.", "error");
        setLoading(false);
        throw new Error("Carrito vacío");
      }

      const dto: OrderDTO= {
        user_id,
        payment_method: payment_method_backend,
        products: productsMapped,
      };

      // NOTE: DO NOT include raw PAN anywhere in dto (we're not sending card_number)
      // if you later want to attach token, attach token only.

      console.debug("ORDER DTO =>", dto);

      const url = `https://back.mar-abierto.online/orders`;
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1] || null;
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const { data } = await axios.post(url, dto, {
        signal: controller.signal,
        headers,
      });

      setMensaje("Orden creada correctamente.");
      clear?.();
      setLoading(false);
      return data;
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      const message =
        axios.isAxiosError(error)
          ? (error.response?.data?.message as string) || error.message
          : (error as Error)?.message || "Error desconocido";

      setMensaje("Error al registrar: " + message);
      showLocalMsg("Error al registrar: " + message, "error");
      setLoading(false);
      throw error;
    } finally {
      abortRef.current = null;
    }
  };

  // ---------- submitOrder ----------
  const submitOrder = async () => {
    if (!paymentMethod) {
      showLocalMsg("Por favor selecciona un método de pago.", "warning");
      throw new Error("No payment method");
    }

    if (paymentMethod === "credit" || paymentMethod === "debit") {
      // Validate card but DO NOT send PAN to backend
      if (!validateCardFields()) {
        throw new Error("Card validation failed");
      }
      const backendMethod = paymentMethod === "credit" ? "credit card" : "debit card";
      // Do not attach PAN or cvv to payload — only send method
      return await createOrder(backendMethod);
    } else if (paymentMethod === "transfer") {
      return await createOrder("transfer");
    } else {
      // fallback: send raw string
      return await createOrder(paymentMethod);
    }
  };

  // Expose hook API
  return {
    // API state
    loading,
    mensaje,
    createOrder, // low-level, if ever needed

    // form state + handlers
    paymentMethod,
    setPaymentMethod,
    cardNumber,
    handleCardNumberChange,
    expiry,
    handleExpiryChange,
    cvv,
    handleCvvChange,

    // local messages
    localMsg,
    localType,
    showLocalMsg,

    // action
    submitOrder,
  };
}
