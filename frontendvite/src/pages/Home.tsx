import { useState, useEffect } from "react";
import LateralPanel from "../components/LateralPanel";
import {
  ChartBarIcon,
  FireIcon,
  UsersIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { apiService, type DashboardData } from "../services/api";

interface WorkoutData {
  day: string;
  sets: number;
}

export default function Home() {
  // Estados para los datos del dashboard
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados derivados para mantener compatibilidad con el código existente
  const macroData = dashboardData?.macroData || {
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
    totalCalories: 0,
  };

  const weeklyWorkouts: WorkoutData[] =
    dashboardData?.weeklyWorkouts.workoutDays.map((day) => ({
      day: day.day,
      sets: day.sets,
    })) || [];

  const userStats = dashboardData?.userStats || {
    name: "Usuario",
    email: "",
    contacts: 0,
    activeStreak: 0,
  };

  // Cargar datos del dashboard al montar el componente
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await apiService.getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Error al cargar los datos del dashboard");
        // En caso de error, los datos mock del servicio se usan automáticamente
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);
  // Cálculo de calorías y porcentajes para el gráfico de macros
  const macroCalories = {
    proteins: macroData.proteins * 4, // 1g proteína = 4 kcal
    carbohydrates: macroData.carbohydrates * 4, // 1g carbohidrato = 4 kcal
    fats: macroData.fats * 9, // 1g grasa = 9 kcal
  };

  const totalCalculatedCalories =
    macroCalories.proteins + macroCalories.carbohydrates + macroCalories.fats;

  const macroPercentages = {
    proteins: (macroCalories.proteins / totalCalculatedCalories) * 100,
    carbohydrates:
      (macroCalories.carbohydrates / totalCalculatedCalories) * 100,
    fats: (macroCalories.fats / totalCalculatedCalories) * 100,
  };
  // Componente de gráfico de dona para macros
  const DonutChart = () => {
    const [hoveredMacro, setHoveredMacro] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const strokeWidth = 20;
    const radius = 80;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const carbOffset = (macroPercentages.proteins / 100) * circumference;
    const fatOffset =
      carbOffset + (macroPercentages.carbohydrates / 100) * circumference;

    const handleMouseEnter = (macroType: string, event: React.MouseEvent) => {
      setHoveredMacro(macroType);
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: React.MouseEvent) => {
      if (hoveredMacro) {
        setMousePosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleMouseLeave = () => {
      setHoveredMacro(null);
    };

    const getTooltipContent = (macroType: string) => {
      switch (macroType) {
        case "proteins":
          return {
            name: "Proteínas",
            calories: macroCalories.proteins,
            grams: macroData.proteins,
            color: "#3b82f6",
          };
        case "carbohydrates":
          return {
            name: "Carbohidratos",
            calories: macroCalories.carbohydrates,
            grams: macroData.carbohydrates,
            color: "#10b981",
          };
        case "fats":
          return {
            name: "Grasas",
            calories: macroCalories.fats,
            grams: macroData.fats,
            color: "#f59e0b",
          };
        default:
          return null;
      }
    };

    return (
      <div className='relative w-48 h-48 mx-auto'>
        <svg
          height={radius * 2}
          width={radius * 2}
          className='transform -rotate-90'>
          <circle
            stroke='#e5e7eb'
            fill='transparent'
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Proteínas */}
          <circle
            stroke='#3b82f6'
            fill='transparent'
            strokeWidth={strokeWidth}
            strokeDasharray={`${
              (macroPercentages.proteins / 100) * circumference
            } ${circumference}`}
            strokeDashoffset={0}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className='transition-all duration-300 ease-in-out cursor-pointer hover:stroke-[#2563eb] hover:opacity-90'
            style={{
              filter:
                hoveredMacro === "proteins"
                  ? "drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))"
                  : "none",
              strokeWidth:
                hoveredMacro === "proteins" ? strokeWidth + 2 : strokeWidth,
            }}
            onMouseEnter={(e) => handleMouseEnter("proteins", e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          {/* Carbohidratos */}
          <circle
            stroke='#10b981'
            fill='transparent'
            strokeWidth={strokeWidth}
            strokeDasharray={`${
              (macroPercentages.carbohydrates / 100) * circumference
            } ${circumference}`}
            strokeDashoffset={-carbOffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className='transition-all duration-300 ease-in-out cursor-pointer hover:stroke-[#059669] hover:opacity-90'
            style={{
              filter:
                hoveredMacro === "carbohydrates"
                  ? "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"
                  : "none",
              strokeWidth:
                hoveredMacro === "carbohydrates"
                  ? strokeWidth + 2
                  : strokeWidth,
            }}
            onMouseEnter={(e) => handleMouseEnter("carbohydrates", e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
          {/* Grasas */}
          <circle
            stroke='#f59e0b'
            fill='transparent'
            strokeWidth={strokeWidth}
            strokeDasharray={`${
              (macroPercentages.fats / 100) * circumference
            } ${circumference}`}
            strokeDashoffset={-fatOffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className='transition-all duration-300 ease-in-out cursor-pointer hover:stroke-[#d97706] hover:opacity-90'
            style={{
              filter:
                hoveredMacro === "fats"
                  ? "drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))"
                  : "none",
              strokeWidth:
                hoveredMacro === "fats" ? strokeWidth + 2 : strokeWidth,
            }}
            onMouseEnter={(e) => handleMouseEnter("fats", e)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </svg>

        {/* Tooltip */}
        {hoveredMacro && (
          <div
            className='fixed z-50 pointer-events-none'
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 10,
            }}>
            <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[140px]'>
              {(() => {
                const content = getTooltipContent(hoveredMacro);
                if (!content) return null;
                return (
                  <div className='space-y-1'>
                    <div className='flex items-center space-x-2'>
                      <div
                        className='w-3 h-3 rounded-full'
                        style={{ backgroundColor: content.color }}></div>
                      <span className='font-semibold text-sm text-gray-800'>
                        {content.name}
                      </span>
                    </div>
                    <div className='text-xs text-gray-600'>
                      <div className='font-medium'>{content.calories} kcal</div>
                      <div>{content.grams}g</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Componente de gráfico de barras para entrenamientos
  const BarChart = () => {
    const maxSets = Math.max(...weeklyWorkouts.map((w) => w.sets));

    return (
      <div className='flex items-end justify-between h-32 px-4'>
        {weeklyWorkouts.map((workout, index) => (
          <div
            key={index}
            className='flex flex-col items-center space-y-2'>
            <div className='relative flex items-end h-24'>
              <div
                className='w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-500 hover:from-blue-600 hover:to-blue-500'
                style={{
                  height:
                    workout.sets === 0
                      ? "4px"
                      : `${(workout.sets / maxSets) * 100}%`,
                  minHeight: "4px",
                }}>
                {workout.sets > 0 && (
                  <div className='absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700'>
                    {workout.sets}
                  </div>
                )}
              </div>
            </div>
            <span className='text-xs text-gray-600 font-medium'>
              {workout.day}
            </span>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className='flex flex-row min-h-full bg-gray-50'>
      <LateralPanel />
      <div className='flex-1 flex justify-center'>
        <div className='w-full max-w-7xl flex flex-col sm:flex-row mt-4'>
          {/* Mostrar loading */}
          {isLoading && (
            <div className='flex-1 p-4 flex items-center justify-center'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
                <p className='mt-4 text-gray-600'>
                  Cargando datos del dashboard...
                </p>
              </div>
            </div>
          )}

          {/* Mostrar error */}
          {error && !isLoading && (
            <div className='flex-1 p-4 flex items-center justify-center'>
              <div className='text-center'>
                <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
                  <h3 className='text-lg font-semibold text-red-800 mb-2'>
                    Error
                  </h3>
                  <p className='text-red-600 mb-4'>{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors'>
                    Reintentar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contenido principal */}
          {!isLoading && !error && (
            <>
              {/* Columna izquierda - Dashboard principal */}
              <div className='flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0'>
                <div className='flex flex-col space-y-4'>
                  {/* Header */}
                  <div className='mb-4'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                      Dashboard
                    </h1>
                    <p className='text-gray-600'>
                      Resumen de tu progreso y actividad
                    </p>
                  </div>

                  {/* Tarjeta de Macros */}
                  <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                    <div className='flex items-center justify-between mb-6'>
                      <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                        <FireIcon className='h-6 w-6 mr-2 text-orange-500' />
                        Macronutrientes de Hoy
                      </h3>
                      <span className='text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full'>
                        {totalCalculatedCalories} kcal
                      </span>
                    </div>{" "}
                    <div className='flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8'>
                      <div className='flex-shrink-0 w-full lg:w-auto flex justify-center'>
                        <DonutChart />
                      </div>

                      <div className='flex-1 w-full space-y-3'>
                        <div className='flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-4 h-4 bg-blue-500 rounded-full flex-shrink-0'></div>
                            <span className='font-medium text-gray-800'>
                              Proteínas
                            </span>
                          </div>
                          <div className='text-right flex-shrink-0'>
                            <div className='font-bold text-gray-800'>
                              {macroData.proteins}g
                            </div>
                            <div className='text-sm text-gray-600'>
                              {macroPercentages.proteins.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center justify-between p-3 bg-green-50 rounded-lg border-l-4 border-green-500'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-4 h-4 bg-green-500 rounded-full flex-shrink-0'></div>
                            <span className='font-medium text-gray-800'>
                              Carbohidratos
                            </span>
                          </div>
                          <div className='text-right flex-shrink-0'>
                            <div className='font-bold text-gray-800'>
                              {macroData.carbohydrates}g
                            </div>
                            <div className='text-sm text-gray-600'>
                              {macroPercentages.carbohydrates.toFixed(1)}%
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500'>
                          <div className='flex items-center space-x-3'>
                            <div className='w-4 h-4 bg-yellow-500 rounded-full flex-shrink-0'></div>
                            <span className='font-medium text-gray-800'>
                              Grasas
                            </span>
                          </div>
                          <div className='text-right flex-shrink-0'>
                            <div className='font-bold text-gray-800'>
                              {macroData.fats}g
                            </div>
                            <div className='text-sm text-gray-600'>
                              {macroPercentages.fats.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta de Entrenamientos Semanales */}
                  <div className='bg-white rounded-lg shadow-sm p-6 mb-4'>
                    <div className='flex items-center justify-between mb-6'>
                      <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                        <ChartBarIcon className='h-6 w-6 mr-2 text-blue-500' />
                        Series por Día (Esta Semana)
                      </h3>
                      <span className='text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full'>
                        {weeklyWorkouts.reduce((acc, w) => acc + w.sets, 0)}{" "}
                        series totales
                      </span>
                    </div>

                    <div className='mb-4'>
                      <BarChart />
                    </div>

                    <div className='flex items-center justify-center space-x-6 text-sm text-gray-600'>
                      <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                        <span>Series completadas</span>
                      </div>
                      <div className='text-gray-500'>
                        Mejor día:{" "}
                        {
                          weeklyWorkouts.reduce((best, current) =>
                            current.sets > best.sets ? current : best
                          ).day
                        }{" "}
                        ({Math.max(...weeklyWorkouts.map((w) => w.sets))}{" "}
                        series){" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/* Columna derecha - Perfil del usuario */}
              <div className='hidden md:flex md:w-80 lg:w-72 p-4 md:sticky md:top-0 md:h-screen overflow-y-auto'>
                <div className='w-full space-y-4'>
                  {/* Tarjeta de perfil */}
                  <div className='bg-white rounded-lg shadow-sm p-6'>
                    <h4 className='text-lg font-semibold mb-4 text-gray-800'>
                      Mi Perfil
                    </h4>

                    {/* Avatar y nombre */}
                    <div className='flex flex-col items-center space-y-3 mb-6'>
                      <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold'>
                        {userStats.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className='text-center'>
                        <h5 className='font-semibold text-gray-800'>
                          {userStats.name}
                        </h5>
                        <p className='text-sm text-gray-600'>
                          {userStats.email}
                        </p>
                      </div>
                    </div>

                    {/* Estadísticas */}
                    <div className='space-y-3'>
                      <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                        <div className='flex items-center space-x-2'>
                          <UsersIcon className='h-5 w-5 text-blue-500' />
                          <span className='text-sm font-medium text-gray-700'>
                            Contactos
                          </span>
                        </div>
                        <span className='font-bold text-gray-800'>
                          {userStats.contacts}
                        </span>
                      </div>

                      <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                        <div className='flex items-center space-x-2'>
                          <TrophyIcon className='h-5 w-5 text-yellow-500' />
                          <span className='text-sm font-medium text-gray-700'>
                            Racha activa
                          </span>
                        </div>{" "}
                        <span className='font-bold text-gray-800'>
                          {userStats.activeStreak} días
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
