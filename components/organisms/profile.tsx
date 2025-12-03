"use client";
import { useState, useEffect } from "react";
import { useUserDetail } from "@/hooks/useUserDetail"; 
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUserOrders } from "@/hooks/useUserOrders";
import { useRouter } from "next/navigation";
import { OrderCard } from "@/components/molecules/orderCard";

export default function Profile() {
  const router = useRouter();
  
  const { user, loading: loadingUser, error: errorUser, refetch } = useUserDetail();
  const { updateUser, loading: updating, mensaje: apiError } = useUpdateUser(); 
  const { orders, loading: loadingOrders } = useUserOrders(user?.user_id);

  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    national_id: "",
  });

  const fillDataFromUser = (userData: { name?: string; last_name?: string; email?: string; phone?: string; address?: string; national_id?: string } | null) => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        national_id: userData.national_id || "",
      });
    }
  };

  useEffect(() => {
    fillDataFromUser(user);
  }, [user]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    fillDataFromUser(user);
    setIsEditing(false);
    setNotification(null);
  };

  const handleLogout = () => {
    document.cookie = "accessToken=; Path=/; Max-Age=0";
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const handleSaveChanges = async () => {
    if (!user || !user.user_id) return;
    const response = await updateUser(user.user_id, formData);

    if (response.success) {
      setNotification({ type: 'success', message: '¡Guardado correctamente!' });
      fillDataFromUser(response.data);
      refetch(); 
      setIsEditing(false);
    } else {
      setNotification({ type: 'error', message: apiError || 'No se pudieron guardar los cambios.' });
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (errorUser || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm">
          <p className="text-red-500 font-medium mb-4">Error al cargar datos</p>
          <button onClick={() => router.push('/login')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ir al Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center relative">
      
      {notification && (
        <div className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-xl transform transition-all duration-500 ease-in-out flex items-center gap-3 animate-bounce-in
          ${notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 'bg-red-100 border-l-4 border-red-500 text-red-700'}
        `}>
          <span className="text-2xl">{notification.type === 'success' ? '💾' : '❌'}</span>
          <div>
            <h4 className="font-bold text-sm">{notification.type === 'success' ? 'Guardado' : 'Error'}</h4>
            <p className="text-sm opacity-90">{notification.message}</p>
          </div>
          <button onClick={() => setNotification(null)} className="ml-4 text-gray-400 hover:text-gray-600">✕</button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl overflow-hidden relative">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 h-32 w-full relative"></div>

        <div className="px-8 pb-8">
          <div className="relative flex items-end -mt-12 mb-8">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-md uppercase -mb-4">
              {formData.name ? formData.name.charAt(0) : 'U'}{formData.last_name ? formData.last_name.charAt(0) : ''}
            </div>
            <div className="ml-4 mb-1">
              <h1 className="text-2xl font-bold text-gray-900 capitalize ">
                {formData.name} {formData.last_name}
              </h1>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase">
                {user.role || "Usuario"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Información Personal</h3>
              <InputField label="Nombre" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
              <InputField label="Apellido" name="last_name" value={formData.last_name} isEditing={isEditing} onChange={handleChange} />
              <InputField label="Documento (ID)" name="national_id" value={formData.national_id} isEditing={isEditing} onChange={handleChange} disabled={true} />
            </div>

            <div className="space-y-5">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Contacto</h3>
              <InputField label="Correo Electrónico" name="email" value={formData.email} isEditing={isEditing} onChange={handleChange} />
              <InputField label="Teléfono" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleChange} />
              <InputField label="Dirección" name="address" value={formData.address} isEditing={isEditing} onChange={handleChange} />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button onClick={handleLogout} className="text-red-500 font-semibold hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
              Cerrar Sesión
            </button>

            <div className="flex gap-3 w-full sm:w-auto">
              {isEditing ? (
                <>
                  <button onClick={handleCancel} disabled={updating} className="flex-1 sm:flex-none px-6 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition font-medium disabled:opacity-50">Cancelar</button>
                  <button onClick={handleSaveChanges} disabled={updating} className="flex-1 sm:flex-none px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg disabled:bg-blue-400">
                    {updating ? "Guardando..." : "Guardar Cambios"}
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="flex-1 sm:flex-none px-6 py-2 rounded-lg text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition font-medium shadow-sm">
                  Editar Datos
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              📋 Historial de Compras
            </h3>

            {loadingOrders ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {orders.map((order) => (
                  <OrderCard 
                    key={order.order_id} 
                    orderId={order.order_id} 
                    date={order.created_at} 
                    initialStatus={order.status}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-4xl mb-2 opacity-30">🛍️</p>
                <p className="text-gray-500 font-medium text-lg">Aún no has realizado pedidos</p>
                <p className="text-gray-400 text-sm">Tus compras aparecerán aquí cuando las realices.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, isEditing, onChange, disabled = false }: {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col group">
      <label className="text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {isEditing && !disabled ? (
        <input type="text" name={name} value={value} onChange={onChange} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white shadow-sm" placeholder={`Ingresa tu ${label.toLowerCase()}`} />
      ) : (
        <div className={`py-2.5 px-3 rounded-lg border border-transparent ${disabled && isEditing ? "bg-gray-100" : "hover:bg-gray-50"}`}>
          <p className={`text-gray-900 font-medium truncate ${!value ? "text-gray-400 italic" : ""}`}>{value || "No especificado"}</p>
        </div>
      )}
    </div>
  );
};