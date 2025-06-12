import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (meal: Omit<Meal, "id">) => void;
  selectedDate: Date;
}

export default function AddMealModal({
  isOpen,
  onClose,
  onAdd,
  selectedDate,
}: AddMealModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    calories: "",
    proteins: "",
    carbohydrates: "",
    fats: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      time: formData.time,
      calories: Number(formData.calories),
      proteins: Number(formData.proteins),
      carbohydrates: Number(formData.carbohydrates),
      fats: Number(formData.fats),
      date: selectedDate.toISOString().split("T")[0],
    });
    onClose();
    setFormData({
      name: "",
      time: "",
      calories: "",
      proteins: "",
      carbohydrates: "",
      fats: "",
    });
  };

  // Función para manejar clicks en el overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {/* Botón cerrar (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </button>

        <h2 className="text-xl font-semibold mb-4 pr-8">Añadir nueva comida</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 text-sm font-medium">
              Nombre de la comida
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Hora</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Calorías</label>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) =>
                setFormData({ ...formData, calories: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Proteínas (g)
              </label>
              <input
                type="number"
                value={formData.proteins}
                onChange={(e) =>
                  setFormData({ ...formData, proteins: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Carbohidratos (g)
              </label>
              <input
                type="number"
                value={formData.carbohydrates}
                onChange={(e) =>
                  setFormData({ ...formData, carbohydrates: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Grasas (g)
              </label>
              <input
                type="number"
                value={formData.fats}
                onChange={(e) =>
                  setFormData({ ...formData, fats: e.target.value })
                }
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
