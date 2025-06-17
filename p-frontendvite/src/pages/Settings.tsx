import { useState } from "react";
import LateralPanel from "../components/LateralPanel";
import {
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  DeviceTabletIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  XMarkIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

interface UserSettings {
  notifications: {
    email: boolean;
    push: boolean;
    weekly_summary: boolean;
  };
  preferences: {
    theme: "light" | "dark" | "system";
  };
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings>({
    notifications: {
      email: true,
      push: true,
      weekly_summary: false,
    },
    preferences: {
      theme: "system",
    },
  });
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
  });

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(profile);

  // Funciones para manejar los modales
  const handleOpenEditProfile = () => {
    setTempProfile(profile);
    setShowEditProfileModal(true);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfileModal(false);
    setTempProfile(profile);
  };

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setShowEditProfileModal(false);
  };

  const handleOpenChangePassword = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSavePassword = () => {
    // Aquí irían las validaciones y el envío al backend
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    // Simular guardado exitoso
    alert("Contraseña actualizada correctamente");
    handleCloseChangePassword();
  };

  const updateNotificationSetting = (
    key: keyof UserSettings["notifications"]
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };
  const updatePreferenceSetting = (
    key: keyof UserSettings["preferences"],
    value: "light" | "dark" | "system"
  ) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempProfile((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-row min-h-full bg-gray-50'>
      <LateralPanel />
      <div className='flex-1 flex justify-center'>
        <div className='w-full max-w-4xl flex flex-col sm:flex-row mt-4'>
          {/* Columna izquierda - Contenido principal */}
          <div className='flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0'>
            <div className='flex flex-col space-y-4'>
              {/* Header principal */}
              <div className='mb-4'>
                <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                  Configuración
                </h1>
                <p className='text-gray-600'>
                  Personaliza tu experiencia y gestiona tu cuenta
                </p>
              </div>

              {/* Sección de Perfil */}
              <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                    <UserCircleIcon className='h-6 w-6 mr-2' />
                    Perfil de Usuario
                  </h3>
                </div>

                <div className='space-y-6'>
                  {" "}
                  <div className='flex items-center space-x-4'>
                    <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden'>
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt='Avatar'
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      )}
                    </div>{" "}
                    <div className='flex-1'>
                      <h4 className='text-lg font-semibold text-gray-800'>
                        {profile.name}
                      </h4>
                      <p className='text-gray-600'>{profile.email}</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <button
                      onClick={handleOpenEditProfile}
                      className='flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                      <span className='text-sm font-medium'>Editar Perfil</span>
                    </button>
                    <button
                      onClick={handleOpenChangePassword}
                      className='flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'>
                      <span className='text-sm font-medium'>
                        Cambiar Contraseña
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sección de Notificaciones */}
              <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                    <BellIcon className='h-6 w-6 mr-2' />
                    Notificaciones
                  </h3>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                    <div>
                      <h4 className='font-medium text-gray-800'>
                        Notificaciones por email
                      </h4>
                      <p className='text-sm text-gray-600'>
                        Recibe actualizaciones importantes por correo
                      </p>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={settings.notifications.email}
                        onChange={() => updateNotificationSetting("email")}
                        className='sr-only peer'
                      />
                      <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                    </label>
                  </div>

                  <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                    <div>
                      <h4 className='font-medium text-gray-800'>
                        Notificaciones push
                      </h4>
                      <p className='text-sm text-gray-600'>
                        Recibe alertas en tiempo real
                      </p>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={settings.notifications.push}
                        onChange={() => updateNotificationSetting("push")}
                        className='sr-only peer'
                      />
                      <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                    </label>
                  </div>

                  <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
                    <div>
                      <h4 className='font-medium text-gray-800'>
                        Resumen semanal
                      </h4>
                      <p className='text-sm text-gray-600'>
                        Recibe un resumen de tu progreso cada semana
                      </p>
                    </div>
                    <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={settings.notifications.weekly_summary}
                        onChange={() =>
                          updateNotificationSetting("weekly_summary")
                        }
                        className='sr-only peer'
                      />
                      <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600'></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sección de Preferencias */}
              <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                    <DocumentTextIcon className='h-6 w-6 mr-2' />
                    Preferencias
                  </h3>
                </div>

                <div className='space-y-6'>
                  {/* Tema */}
                  <div className='p-4 border border-gray-200 rounded-lg'>
                    <div className='flex items-center mb-3'>
                      <DeviceTabletIcon className='h-5 w-5 text-gray-600 mr-2' />
                      <h4 className='font-medium text-gray-800'>Tema</h4>
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                      <button
                        onClick={() =>
                          updatePreferenceSetting("theme", "light")
                        }
                        className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${
                          settings.preferences.theme === "light"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}>
                        <SunIcon className='h-6 w-6 mb-1' />
                        <span className='text-sm'>Claro</span>
                      </button>
                      <button
                        onClick={() => updatePreferenceSetting("theme", "dark")}
                        className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${
                          settings.preferences.theme === "dark"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}>
                        <MoonIcon className='h-6 w-6 mb-1' />
                        <span className='text-sm'>Oscuro</span>
                      </button>
                      <button
                        onClick={() =>
                          updatePreferenceSetting("theme", "system")
                        }
                        className={`flex flex-col items-center p-3 border rounded-lg transition-colors ${
                          settings.preferences.theme === "system"
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}>
                        <ComputerDesktopIcon className='h-6 w-6 mb-1' />
                        <span className='text-sm'>Sistema</span>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección de Privacidad y Seguridad */}
              <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                <div className='flex items-center justify-between mb-6'>
                  <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                    <ShieldCheckIcon className='h-6 w-6 mr-2' />
                    Privacidad y Seguridad
                  </h3>
                </div>

                <div className='space-y-4'>
                  <button className='w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'>
                    <div className='text-left'>
                      <h4 className='font-medium text-gray-800'>
                        Eliminar cuenta
                      </h4>
                      <p className='text-sm text-gray-600'>
                        Elimina permanentemente tu cuenta y datos
                      </p>
                    </div>
                    <div className='text-red-600'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Sección de Cerrar Sesión */}
              <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                <button className='w-full flex items-center justify-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 hover:bg-red-100 transition-colors'>
                  <ArrowRightOnRectangleIcon className='h-5 w-5' />
                  <span className='font-medium'>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Editar Perfil */}
      {showEditProfileModal && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Editar Perfil
              </h3>
              <button
                onClick={handleCloseEditProfile}
                className='p-1 hover:bg-gray-100 rounded-full'>
                <XMarkIcon className='h-5 w-5 text-gray-500' />
              </button>
            </div>

            <div className='space-y-6'>
              {/* Foto de perfil */}
              <div className='flex flex-col items-center space-y-4'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden'>
                    {tempProfile.avatar ? (
                      <img
                        src={tempProfile.avatar}
                        alt='Avatar'
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      tempProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    )}
                  </div>
                  <button
                    onClick={() =>
                      document.getElementById("avatar-upload")?.click()
                    }
                    className='absolute -bottom-1 -right-1 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors'>
                    <CameraIcon className='h-3 w-3' />
                  </button>
                  <input
                    id='avatar-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleAvatarChange}
                    className='hidden'
                  />
                </div>
                <p className='text-sm text-gray-600'>
                  Haz clic en la cámara para cambiar tu foto
                </p>
              </div>
              {/* Nombre */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nombre completo
                </label>
                <input
                  type='text'
                  value={tempProfile.name}
                  onChange={(e) =>
                    setTempProfile((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Tu nombre completo'
                />
              </div>
              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Correo electrónico
                </label>
                <input
                  type='email'
                  value={tempProfile.email}
                  onChange={(e) =>
                    setTempProfile((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='tu@email.com'
                />
              </div>{" "}
              {/* Botones */}
              <div className='flex space-x-3 pt-4'>
                <button
                  onClick={handleCloseEditProfile}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProfile}
                  className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cambiar Contraseña */}
      {showChangePasswordModal && (
        <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md mx-4'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-semibold text-gray-800'>
                Cambiar Contraseña
              </h3>
              <button
                onClick={handleCloseChangePassword}
                className='p-1 hover:bg-gray-100 rounded-full'>
                <XMarkIcon className='h-5 w-5 text-gray-500' />
              </button>
            </div>

            <div className='space-y-4'>
              {/* Contraseña actual */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Contraseña actual
                </label>
                <input
                  type='password'
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Tu contraseña actual'
                />
              </div>

              {/* Nueva contraseña */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Nueva contraseña
                </label>
                <input
                  type='password'
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Tu nueva contraseña'
                />
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Confirmar nueva contraseña
                </label>
                <input
                  type='password'
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Confirma tu nueva contraseña'
                />
              </div>

              {/* Indicaciones de seguridad */}
              <div className='bg-gray-50 p-3 rounded-lg'>
                <p className='text-sm text-gray-600 mb-2'>
                  La contraseña debe tener:
                </p>
                <ul className='text-xs text-gray-500 space-y-1'>
                  <li>• Al menos 6 caracteres</li>
                  <li>• Una combinación de letras y números</li>
                  <li>• Al menos un carácter especial (recomendado)</li>
                </ul>
              </div>

              {/* Botones */}
              <div className='flex space-x-3 pt-4'>
                <button
                  onClick={handleCloseChangePassword}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'>
                  Cancelar
                </button>
                <button
                  onClick={handleSavePassword}
                  className='flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
