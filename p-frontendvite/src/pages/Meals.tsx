import { useState } from "react";
import LateralPanel from "../components/LateralPanel";
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
}

export default function Meals() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, name: "Desayuno", time: "08:00", calories: 450, proteins: 20 },
    { id: 2, name: "Almuerzo", time: "14:00", calories: 650, proteins: 35 },
  ]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-row min-h-full bg-gray-150">
      <LateralPanel />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:flex-row mt-4">
          {/* Columna izquierda - Lista de comidas */}
          <div className="flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0">
            <div className="flex flex-col space-y-4">
              {/* Navegación de fechas */}
              <div className=" mb-4">
                <div className="flex items-center justify-between p-4">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() =>
                      setSelectedDate(
                        new Date(
                          selectedDate.setDate(selectedDate.getDate() - 1)
                        )
                      )
                    }
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <h2 className="text-lg font-semibold capitalize">
                    {formatDate(selectedDate)}
                  </h2>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() =>
                      setSelectedDate(
                        new Date(
                          selectedDate.setDate(selectedDate.getDate() + 1)
                        )
                      )
                    }
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Lista de comidas */}
              {meals.map((meal) => (
                <div
                  key={meal.id}
                  className=""
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{meal.name}</h3>
                      <span className="text-gray-500">{meal.time}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="mr-4">🔥 {meal.calories} kcal</span>
                      <span>🥩 {meal.proteins}g proteína</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botón añadir comida */}
              <button className=" hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center p-4 text-gray-500">
                  <PlusIcon className="h-6 w-6 mr-2" />
                  <span>Añadir comida</span>
                </div>
              </button>
            </div>
          </div>

          {/* Columna derecha - Calendario */}
          <div className="hidden md:flex p-4 md:sticky md:top-0 md:h-screen md:mr-10 lg:mr-25 overflow-hidden items-start justify-center">
            <div className="">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Calendario</h3>
                  <CalendarIcon className="h-6 w-6 text-gray-500" />
                </div>
                {/* Aquí iría el componente de calendario */}
                <div className="w-64 h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Calendario aquí</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Características implementadas:
// Navegación por fechas:

// Flechas para navegar entre días
// Fecha actual mostrada en formato largo
// Botones con efecto hover
// Lista de comidas:

// Cada comida en su propio ""
// Muestra hora, calorías y proteínas
// Diseño limpio y organizado
// Botón de añadir:

// Botón grande y visible
// Icono + texto
// Efecto hover suave
// Calendario lateral:

// Fijo en la columna derecha
// Visible solo en pantallas md y superiores
// Espacio reservado para implementar calendario
// Estilos:
// Mantiene la consistencia con el diseño de Home
// Usa los mismos "s" y espaciado
// Responsivo y limpio
// Siguiente paso:
// Para completar la funcionalidad necesitarías:

// Implementar un calendario real (podrías usar react-calendar)
// Crear un modal para añadir nuevas comidas
// Conectar con el backend para guardar/cargar las comidas
