import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">pressLoad</h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* Contenido principal */}
        {isAuthenticated && user ? (
          <div className="space-y-6">
            {/* Tarjeta de bienvenida */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                ¡Bienvenido, {user.username}! 👋
              </h2>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <span className="font-medium w-24">Email:</span>
                  <span>{user.email}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium w-24">Rol:</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {user.role?.name || "Usuario"}
                  </span>
                </p>
              </div>
            </div>

            {/* Tarjeta de rutinas */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Mis Rutinas
                </h3>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  {user.routines?.length || 0} rutinas
                </span>
              </div>

              {user.routines && user.routines.length > 0 ? (
                <div className="space-y-3">
                  {user.routines.map((routine, index) => (
                    <div
                      key={routine.id || index}
                      className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition"
                    >
                      <h4 className="font-semibold text-gray-800">
                        {routine.name || `Rutina ${index + 1}`}
                      </h4>
                      {routine.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {routine.description}
                        </p>
                      )}
                      {routine.createdAt && (
                        <p className="text-xs text-gray-400 mt-2">
                          Creada:{" "}
                          {new Date(routine.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    Aún no tienes rutinas creadas
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Crear mi primera rutina
                  </button>
                </div>
              )}
            </div>

            {/* Tarjeta de estadísticas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <h4 className="text-sm font-medium opacity-90">
                  Total Rutinas
                </h4>
                <p className="text-3xl font-bold mt-2">
                  {user.routines?.length || 0}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                <h4 className="text-sm font-medium opacity-90">
                  Entrenamientos
                </h4>
                <p className="text-3xl font-bold mt-2">0</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <h4 className="text-sm font-medium opacity-90">Progreso</h4>
                <p className="text-3xl font-bold mt-2">0%</p>
              </div>
            </div>
          </div>
        ) : (
          // Usuario no autenticado
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Bienvenido a pressLoad
            </h2>
            <p className="text-gray-600 mb-6">
              Tu plataforma para gestionar entrenamientos y rutinas
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-medium"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
