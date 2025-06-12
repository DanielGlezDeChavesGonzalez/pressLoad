import { useState } from "react";
import LateralPanel from "../components/LateralPanel";
import AddMealModal from "../components/AddMealModal";
import MiniCalendar from "../components/MiniCalendar";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

interface Meal {
  id: number;
  name: string;
  time: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  date: string;
}

export default function Meals() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función helper para formatear fechas consistentemente
  const formatDateToString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Crear una fecha fija para hoy usando la función helper
  const todayString = formatDateToString(new Date());


  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Desayuno",
      time: "08:00",
      calories: 450,
      proteins: 20,
      carbohydrates: 35,
      fats: 15,
      date: todayString,
    },
    {
      id: 2,
      name: "Almuerzo",
      time: "14:00",
      calories: 650,
      proteins: 35,
      carbohydrates: 45,
      fats: 25,
      date: todayString,
    },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddMeal = (newMeal: Omit<Meal, "id">) => {
    setMeals((prevMeals) => [
      ...prevMeals,
      {
        ...newMeal,
        id: Math.max(...prevMeals.map((m) => m.id), 0) + 1,
      },
    ]);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1); // CORREGIDO: usar newDate en lugar de selectedDate
    } else {
      newDate.setDate(newDate.getDate() + 1); // CORREGIDO: usar newDate en lugar de selectedDate
    }
    setSelectedDate(newDate);
  };

  // Usar la función helper para filtrar comidas
  const filteredMeals = meals.filter(
    (meal) => meal.date === formatDateToString(selectedDate)
  );

  const getTotalNutrients = () => {
    return filteredMeals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        proteins: totals.proteins + meal.proteins,
        carbohydrates: totals.carbohydrates + meal.carbohydrates,
        fats: totals.fats + meal.fats,
      }),
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 }
    );
  };

  const totals = getTotalNutrients();

  return (
    <div className="flex flex-row min-h-full bg-gray-150">
      <LateralPanel />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:flex-row mt-4">
          {/* Columna izquierda - Lista de comidas */}
          <div className="flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0">
            <div className="flex flex-col space-y-4">
              {/* Navegación de fechas */}
              <div className="mb-4">
                <div className="flex items-center justify-between p-4">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => navigateDate("prev")}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <h2 className="text-lg font-semibold capitalize">
                    {formatDate(selectedDate)}
                  </h2>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => navigateDate("next")}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Resumen nutricional del día */}
              {filteredMeals.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Resumen del día</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="mr-2">🔥</span>
                      <span>{totals.calories} kcal</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🥩</span>
                      <span>{totals.proteins}g proteínas</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🍞</span>
                      <span>{totals.carbohydrates}g carbohidratos</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🥑</span>
                      <span>{totals.fats}g grasas</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lista de comidas */}
              {filteredMeals.map((meal) => (
                <div
                  key={meal.id}
                  className="bg-white rounded-lg shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{meal.name}</h3>
                      <span className="text-gray-500">{meal.time}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-1">🔥</span>
                        <span>{meal.calories} kcal</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🥩</span>
                        <span>{meal.proteins}g</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🍞</span>
                        <span>{meal.carbohydrates}g</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🥑</span>
                        <span>{meal.fats}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Mensaje cuando no hay comidas */}
              {filteredMeals.length === 0 && (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    No hay comidas registradas para este día
                  </p>
                </div>
              )}

              {/* Botón añadir comida */}
              <button
                className="hover:bg-gray-50 transition-colors rounded-lg shadow-sm bg-white"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex items-center justify-center p-4 text-gray-500">
                  <PlusIcon className="h-6 w-6 mr-2" />
                  <span>Añadir comida</span>
                </div>
              </button>
            </div>
          </div>

          {/* Columna derecha - Calendario */}
          <div className="hidden md:flex p-4 md:sticky md:top-0 md:h-screen md:mr-10 lg:mr-25 overflow-hidden items-start justify-center">
            <div className="space-y-4">
              <MiniCalendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddMealModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMeal}
        selectedDate={selectedDate}
      />
    </div>
  );
}
