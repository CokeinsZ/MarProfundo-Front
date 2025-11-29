'use client';

import { useState } from 'react';
import { User } from '@/interfaces/user';
import { useUserDetail } from '@/hooks/useUserDetail';
import { User as UserIcon, Mail, Phone, IdCard, MapPin, Shield, Activity } from 'lucide-react';

interface UserDetailViewProps {
  userId: string;
}

const statusColors = {
  not_verified: 'bg-gray-100 text-gray-800 border-gray-300',
  active: 'bg-green-100 text-green-800 border-green-300',
  inactive: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  banned: 'bg-red-100 text-red-800 border-red-300',
};

const statusLabels = {
  not_verified: 'No Verificado',
  active: 'Activo',
  inactive: 'Inactivo',
  banned: 'Baneado',
};

const roleColors = {
  user: 'bg-blue-100 text-blue-800 border-blue-300',
  admin: 'bg-purple-100 text-purple-800 border-purple-300',
};

const roleLabels = {
  user: 'Usuario',
  admin: 'Administrador',
};

export default function UserDetailView({ userId }: UserDetailViewProps) {
  const { user, loading, error, updateStatus, updateRole } = useUserDetail(userId);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (!user) return;

    setUpdating(true);
    try {
      await updateStatus(user.user_id, newStatus);
      alert('Estado actualizado exitosamente');
    } catch (err) {
      alert('Error al actualizar el estado');
    } finally {
      setUpdating(false);
    }
  };

  const handleRoleChange = async (newRole: string) => {
    if (!user) return;

    if (!confirm(`¿Estás seguro de cambiar el rol a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}?`)) {
      return;
    }

    setUpdating(true);
    try {
      await updateRole(user.user_id, newRole);
      alert('Rol actualizado exitosamente');
    } catch (err) {
      alert('Error al actualizar el rol');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error || 'Usuario no encontrado'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {user.name} {user.last_name}
        </h1>
        <p className="text-gray-600 mt-2">ID: #{user.user_id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del usuario */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos personales */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <UserIcon className="mr-2" size={24} />
              Información Personal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <UserIcon className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Nombre Completo</p>
                  <p className="font-semibold text-gray-900">
                    {user.name} {user.last_name}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <IdCard className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="text-sm text-gray-500">Documento de Identidad</p>
                  <p className="text-gray-900">{user.national_id}</p>
                </div>
              </div>
              {user.address && (
                <div className="flex items-start space-x-3 md:col-span-2">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    <p className="text-gray-900">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Configuración */}
        <div className="space-y-6">
          {/* Estado */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2" size={24} />
              Estado
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 inline-flex text-sm font-semibold rounded-lg border-2 ${statusColors[user.status]}`}>
                  {statusLabels[user.status]}
                </span>
              </div>
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="not_verified">No Verificado</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="banned">Baneado</option>
              </select>
            </div>
          </div>

          {/* Rol */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2" size={24} />
              Rol
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-4 py-2 inline-flex text-sm font-semibold rounded-lg border-2 ${roleColors[user.role]}`}>
                  {roleLabels[user.role]}
                </span>
              </div>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                disabled={updating}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <p className="text-xs text-gray-500">
                ⚠️ Cambiar el rol afecta los permisos del usuario
              </p>
            </div>
          </div>

          {/* Fechas */}
          {(user.created_at || user.updated_at) && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Fechas</h2>
              <div className="space-y-3">
                {user.created_at && (
                  <div>
                    <p className="text-sm text-gray-500">Registro</p>
                    <p className="text-gray-900">
                      {new Date(user.created_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                )}
                {user.updated_at && (
                  <div>
                    <p className="text-sm text-gray-500">Última actualización</p>
                    <p className="text-gray-900">
                      {new Date(user.updated_at).toLocaleString('es-ES')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
