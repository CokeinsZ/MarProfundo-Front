"use client";

import React, { useState } from "react";
import ResumeGrid from "../molecules/resumeGrid";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/usechekout"; // ruta según tu proyecto
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const { productos } = useCart();
  const total = productos.reduce((acc, p) => acc + (Number(p.price) || 0) * (p.cantidad || 0), 0);

  const {
    loading,
    mensaje,
    paymentMethod,
    setPaymentMethod,
    cardNumber,
    handleCardNumberChange,
    expiry,
    handleExpiryChange,
    cvv,
    handleCvvChange,
    localMsg,
    localType,
    submitOrder,
  } = useCheckout();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | number | null>(null);

  const openThankYouModal = (id?: string | number | null) => {
    setOrderId(id ?? null);
    setModalOpen(true);
    // redirect to home after 3s
    window.setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleGoHomeNow = () => {
    router.push("/");
  };

  const handleContinue = async () => {
    try {
      const data = await submitOrder();
      const id = data?.id ?? data?.orderId ?? data?.order?.id ?? null;
      openThankYouModal(id);
    } catch (err) {
      console.error("Error processing order:", err);
    } finally {
      console.log("carrito:", productos);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 text-blue-900">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {localMsg && (
        <div
          className={`mb-4 p-4 rounded border ${
            localType === "error"
              ? "bg-red-50 border-red-300 text-red-800"
              : localType === "warning"
              ? "bg-yellow-50 border-yellow-300 text-yellow-800"
              : "bg-blue-50 border-blue-300 text-blue-800"
          }`}
        >
          {localMsg}
        </div>
      )}

      <div className="grid grid-cols-5 gap-4 items-start">
        <div className="col-span-3 bg-white rounded-lg shadow p-6 border border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Método de Pago</h2>

          <div className="space-y-3">
            <label className="flex items-center text-blue-900">
              <input
                type="radio"
                value="credit"
                checked={paymentMethod === "credit"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 accent-blue-900"
              />
              Tarjeta de Crédito
            </label>

            <label className="flex items-center text-blue-900">
              <input
                type="radio"
                value="debit"
                checked={paymentMethod === "debit"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 accent-blue-900"
              />
              Tarjeta de Débito
            </label>

            <label className="flex items-center text-blue-900">
              <input
                type="radio"
                value="transfer"
                checked={paymentMethod === "transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 accent-blue-900"
              />
              Transfer
            </label>
          </div>

          {(paymentMethod === "credit" || paymentMethod === "debit") && (
            <div className="mt-5 space-y-4 text-blue-900">
              <div>
                <label className="block text-sm font-medium mb-1">Número de tarjeta</label>
                <input
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiración (MM/AA)</label>
                  <input
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    placeholder="MM/AA"
                    className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input
                    inputMode="numeric"
                    value={cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    placeholder="123"
                    className="w-full border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "transfer" && (
            <div className="mt-5 space-y-3 text-blue-900">
              <div className="text-sm font-medium">Datos para transferencia (ficticios):</div>
              <div className="bg-slate-50 border border-blue-100 p-3 rounded">
                <div className="text-sm">Banco: Banco Marítimo</div>
                <div className="text-sm">Cuenta: 000123456789</div>
                <div className="text-sm">CBU: 1230000000000000000001</div>
                <div className="text-sm">Titular: MAR ABIERTO S.A.</div>
              </div>
              <div className="text-sm text-slate-600">Realiza la transferencia y guarda tu comprobante.</div>
            </div>
          )}
        </div>

        <div className="col-span-2">
          <ResumeGrid
            title="compra"
            action={loading ? "Procesando..." : "Confirmar pedido"}
            ruta="/payment"
            productos={productos}
            total={total}
            onContinuar={handleContinue}
            disabled={loading}
          />
        </div>
      </div>

      {loading && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-blue-900">Procesando orden...</div>
      )}

      {mensaje && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded text-blue-900">{mensaje}</div>
      )}

      {/* THANK YOU MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => { /* block click */ }} />
          <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-2 text-blue-900">¡Gracias por tu compra!</h3>
            <p className="text-sm text-slate-700 mb-4">
              {orderId ? `Tu número de orden es: ${orderId}.` : "Tu orden ha sido creada correctamente."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleGoHomeNow}
                className="flex-1 bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
              >
                Ir al inicio
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 border border-blue-200 text-blue-900 py-2 rounded hover:bg-blue-50"
              >
                Cerrar
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Serás redirigido al inicio en unos segundos...</p>
          </div>
        </div>
      )}
    </div>
  );
}
