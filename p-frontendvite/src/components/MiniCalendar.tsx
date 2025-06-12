import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface MiniCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function MiniCalendar({
  selectedDate,
  onDateSelect,
}: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Función helper para formatear fechas de manera consistente (sin problemas de zona horaria)
  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const isSelectedDay = (day: number) => {
    if (!day) return false;
    const dayDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return formatDateToString(dayDate) === formatDateToString(selectedDate);
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    const dayDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return formatDateToString(dayDate) === formatDateToString(today);
  };

  const handleDayClick = (day: number) => {
    if (!day) return;
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
      12, // Establecer la hora a mediodía para evitar problemas de zona horaria
      0,
      0,
      0
    );
    onDateSelect(newDate);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <h3 className="font-semibold text-sm">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth("next")}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 p-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays().map((day, index) => (
          <button
            key={index}
            onClick={() => {
              handleDayClick(day);
            }}
            disabled={!day}
            className={`
              h-8 w-8 text-xs rounded flex items-center justify-center
              ${!day ? "invisible" : "hover:bg-gray-100"}
              ${
                isSelectedDay(day)
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : ""
              }
              ${
                isToday(day) && !isSelectedDay(day)
                  ? "bg-gray-200 font-semibold"
                  : ""
              }
            `}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
