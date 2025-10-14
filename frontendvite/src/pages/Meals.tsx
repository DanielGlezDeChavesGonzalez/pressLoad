// import { useState, useEffect } from "react";
// import LateralPanel from "../components/LateralPanel";
// import AddMealModal from "../components/AddMealModal";
// import MiniCalendar from "../components/MiniCalendar";
// import { apiService, type Meal } from "../api/api";
// import {
//   PlusIcon,
//   TrashIcon,
//   PencilSquareIcon,
//   CheckIcon,
//   XMarkIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/24/outline";

// export default function Meals() {
//   // Inicializar selectedDate con hora a mediodía para evitar problemas de zona horaria
//   const [selectedDate, setSelectedDate] = useState(() => {
//     const today = new Date();
//     return new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate(),
//       12,
//       0,
//       0,
//       0
//     );
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingMeal, setEditingMeal] = useState<number | null>(null);
//   const [tempEditedMeal, setTempEditedMeal] = useState<Meal | null>(null);
//   const [meals, setMeals] = useState<Meal[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Función helper para formatear fechas consistentemente (sin problemas de zona horaria)
//   const formatDateToString = (date: Date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   // Cargar comidas para la fecha seleccionada
//   useEffect(() => {
//     const loadMeals = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const dateString = formatDateToString(selectedDate);
//         const mealsData = await apiService.getMealsByDate(dateString);

//         // Convertir datos del backend al formato esperado por el frontend
//         const formattedMeals = mealsData.map((meal) => ({
//           ...meal,
//           calories: meal.totalCalories || 0,
//           proteins: meal.totalProteins || 0,
//           carbohydrates: meal.totalCarbohydrates || 0,
//           fats: meal.totalFats || 0,
//         }));

//         setMeals(formattedMeals);
//       } catch (error) {
//         console.error("Error loading meals:", error);
//         setError("Error al cargar las comidas");
//         setMeals([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadMeals();
//   }, [selectedDate]);
//   // Función para formatear fecha para mostrar (igual que en Routines)
//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("es-ES", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   // Función de navegación entre días (igual que en Routines)
//   const navigateDate = (direction: "prev" | "next") => {
//     const newDate = new Date(selectedDate);
//     if (direction === "prev") {
//       newDate.setDate(newDate.getDate() - 1);
//     } else {
//       newDate.setDate(newDate.getDate() + 1);
//     }
//     setSelectedDate(newDate);
//   };

//   // Funciones de manejo
//   const handleDateSelect = (date: Date) => {
//     // Crear nueva fecha con hora a mediodía para evitar problemas de zona horaria
//     const newDate = new Date(
//       date.getFullYear(),
//       date.getMonth(),
//       date.getDate(),
//       12,
//       0,
//       0,
//       0
//     );
//     setSelectedDate(newDate);
//   };

//   const handleEditMeal = (meal: Meal) => {
//     setEditingMeal(meal.id);
//     setTempEditedMeal({ ...meal });
//   };

//   const handleCancelEditMeal = () => {
//     setEditingMeal(null);
//     setTempEditedMeal(null);
//   };
//   const handleSaveEditedMeal = async () => {
//     if (tempEditedMeal) {
//       try {
//         const updatedMeal = await apiService.updateMeal(tempEditedMeal.id, {
//           name: tempEditedMeal.name,
//           time: tempEditedMeal.time,
//           notes: tempEditedMeal.notes,
//         });

//         // Convertir datos del backend al formato esperado por el frontend
//         const formattedMeal = {
//           ...updatedMeal,
//           calories: updatedMeal.totalCalories || 0,
//           proteins: updatedMeal.totalProteins || 0,
//           carbohydrates: updatedMeal.totalCarbohydrates || 0,
//           fats: updatedMeal.totalFats || 0,
//         };

//         setMeals((prevMeals) =>
//           prevMeals.map((meal) =>
//             meal.id === tempEditedMeal.id ? formattedMeal : meal
//           )
//         );
//         setEditingMeal(null);
//         setTempEditedMeal(null);
//       } catch (error) {
//         console.error("Error updating meal:", error);
//         setError("Error al actualizar la comida");
//       }
//     }
//   };

//   const handleUpdateTempMeal = (field: keyof Meal, value: string | number) => {
//     if (tempEditedMeal) {
//       setTempEditedMeal({
//         ...tempEditedMeal,
//         [field]: value,
//       });
//     }
//   };

//   const handleDeleteMeal = async (id: number) => {
//     try {
//       await apiService.deleteMeal(id);
//       setMeals((prevMeals) => prevMeals.filter((meal) => meal.id !== id));
//     } catch (error) {
//       console.error("Error deleting meal:", error);
//       setError("Error al eliminar la comida");
//     }
//   };

//   const handleAddMeal = async (newMeal: Omit<Meal, "id">) => {
//     try {
//       const createdMeal = await apiService.createMeal({
//         name: newMeal.name,
//         date: newMeal.date,
//         time: newMeal.time,
//         notes: newMeal.notes,
//       });

//       // Convertir datos del backend al formato esperado por el frontend
//       const formattedMeal = {
//         ...createdMeal,
//         calories: createdMeal.totalCalories || 0,
//         proteins: createdMeal.totalProteins || 0,
//         carbohydrates: createdMeal.totalCarbohydrates || 0,
//         fats: createdMeal.totalFats || 0,
//       };

//       setMeals((prevMeals) => [...prevMeals, formattedMeal]);
//     } catch (error) {
//       console.error("Error creating meal:", error);
//       setError("Error al crear la comida");
//     }
//   };

//   // Filtrar comidas para la fecha seleccionada
//   const selectedDateString = formatDateToString(selectedDate);
//   const filteredMeals = meals.filter(
//     (meal) => meal.date === selectedDateString
//   );
//   // Calcular totales diarios
//   const dailyTotals = filteredMeals.reduce(
//     (totals, meal) => ({
//       calories: totals.calories + (meal.calories || 0),
//       proteins: totals.proteins + (meal.proteins || 0),
//       carbohydrates: totals.carbohydrates + (meal.carbohydrates || 0),
//       fats: totals.fats + (meal.fats || 0),
//     }),
//     { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 }
//   );
//   // Función para renderizar días en el calendario
//   const renderCalendarDay = (day: Date) => {
//     const dayString = formatDateToString(day);
//     const hasMeals = meals.some((meal) => meal.date === dayString);

//     return (
//       <div className='relative flex flex-col items-center'>
//         <span>{day.getDate()}</span>
//         {hasMeals && (
//           <div className='w-1.5 h-1.5 bg-green-500 rounded-full mt-1'></div>
//         )}
//       </div>
//     );
//   };

//   // Calcular estadísticas del mes
//   const currentMonth = selectedDate.getMonth();
//   const currentYear = selectedDate.getFullYear();
//   const monthMeals = meals.filter((meal) => {
//     const mealDate = new Date(meal.date + "T12:00:00");
//     return (
//       mealDate.getMonth() === currentMonth &&
//       mealDate.getFullYear() === currentYear
//     );
//   });

//   const monthStats = {
//     totalMeals: monthMeals.length,
//     daysWithMeals: new Set(monthMeals.map((meal) => meal.date)).size,
//   };
//   return (
//     <div className='flex flex-row min-h-full bg-gray-50'>
//       <LateralPanel />
//       <div className='flex-1 flex justify-center'>
//         <div className='w-full max-w-7xl flex flex-col sm:flex-row mt-4'>
//           {/* Columna izquierda - Lista de comidas */}
//           <div className='flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0'>
//             {" "}
//             <div className='flex flex-col space-y-4'>
//               {/* Navegación de fechas */}
//               <div className='mb-4'>
//                 <div className='flex items-center justify-between p-4'>
//                   <button
//                     className='p-2 hover:bg-gray-100 rounded-full'
//                     onClick={() => navigateDate("prev")}>
//                     <ChevronLeftIcon className='h-6 w-6' />
//                   </button>
//                   <h2 className='text-lg font-semibold capitalize'>
//                     {formatDate(selectedDate)}
//                   </h2>
//                   <button
//                     className='p-2 hover:bg-gray-100 rounded-full'
//                     onClick={() => navigateDate("next")}>
//                     <ChevronRightIcon className='h-6 w-6' />
//                   </button>
//                 </div>{" "}
//               </div>

//               {/* Mensaje de error */}
//               {error && (
//                 <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
//                   <p className='text-red-700'>{error}</p>
//                   <button
//                     onClick={() => setError(null)}
//                     className='text-red-500 hover:text-red-700 underline text-sm mt-2'>
//                     Cerrar
//                   </button>
//                 </div>
//               )}

//               {/* Indicador de carga */}
//               {isLoading ? (
//                 <div className='flex justify-center items-center py-8'>
//                   <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
//                   <span className='ml-2 text-gray-600'>
//                     Cargando comidas...
//                   </span>
//                 </div>
//               ) : filteredMeals.length === 0 ? (
//                 <div className='text-center py-8 text-gray-500'>
//                   <p className='mb-4'>
//                     No hay comidas registradas para este día
//                   </p>
//                   <button
//                     onClick={() => setIsModalOpen(true)}
//                     className='text-blue-600 hover:text-blue-700 underline'>
//                     Agregar primera comida
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   {/* Resumen diario */}
//                   {filteredMeals.length > 0 && (
//                     <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200'>
//                       <h3 className='text-lg font-bold text-gray-800 mb-4'>
//                         Resumen del día
//                       </h3>
//                       <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
//                         <div className='flex items-center'>
//                           <span className='mr-2'>🔥</span>
//                           <span>{dailyTotals.calories} kcal</span>
//                         </div>
//                         <div className='flex items-center'>
//                           <span className='mr-2'>🥩</span>
//                           <span>{dailyTotals.proteins}g proteínas</span>
//                         </div>
//                         <div className='flex items-center'>
//                           <span className='mr-2'>🍞</span>
//                           <span>
//                             {dailyTotals.carbohydrates}g carbohidratos
//                           </span>
//                         </div>
//                         <div className='flex items-center'>
//                           <span className='mr-2'>🥑</span>
//                           <span>{dailyTotals.fats}g grasas</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Lista de comidas */}
//                   <div className='space-y-3'>
//                     {filteredMeals.map((meal) => (
//                       <div
//                         key={meal.id}
//                         className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200'>
//                         {" "}
//                         {editingMeal === meal.id ? (
//                           // Modo edición - mismo esquema pero con colores neutros
//                           <div className='p-3 bg-gray-50 border-l-4 border-gray-300'>
//                             <div className='flex justify-between items-start mb-2'>
//                               <div className='flex-1'>
//                                 <div className='flex items-center space-x-2 mb-1'>
//                                   <input
//                                     type='text'
//                                     value={tempEditedMeal?.name || ""}
//                                     onChange={(e) =>
//                                       handleUpdateTempMeal(
//                                         "name",
//                                         e.target.value
//                                       )
//                                     }
//                                     className='font-semibold text-gray-700 text-sm bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none'
//                                     placeholder='Nombre de la comida'
//                                   />
//                                   <input
//                                     type='time'
//                                     value={tempEditedMeal?.time || ""}
//                                     onChange={(e) =>
//                                       handleUpdateTempMeal(
//                                         "time",
//                                         e.target.value
//                                       )
//                                     }
//                                     className='text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200 focus:border-gray-400 outline-none'
//                                   />
//                                 </div>
//                               </div>
//                               <div className='flex space-x-1'>
//                                 <button
//                                   onClick={handleCancelEditMeal}
//                                   className='p-1 text-gray-400 hover:text-gray-600 rounded transition-colors'>
//                                   <XMarkIcon className='h-3 w-3' />
//                                 </button>
//                                 <button
//                                   onClick={handleSaveEditedMeal}
//                                   className='p-1 text-gray-400 hover:text-gray-700 rounded transition-colors'>
//                                   <CheckIcon className='h-3 w-3' />
//                                 </button>
//                               </div>
//                             </div>

//                             <div className='grid grid-cols-4 gap-2'>
//                               <div className='bg-gray-100 rounded-md p-2 text-center border border-gray-200'>
//                                 <input
//                                   type='number'
//                                   value={tempEditedMeal?.calories || ""}
//                                   onChange={(e) =>
//                                     handleUpdateTempMeal(
//                                       "calories",
//                                       parseInt(e.target.value) || 0
//                                     )
//                                   }
//                                   className='w-full text-sm font-bold text-gray-700 bg-transparent text-center outline-none'
//                                   placeholder='0'
//                                 />
//                                 <div className='text-xs text-gray-500'>
//                                   kcal
//                                 </div>
//                               </div>
//                               <div className='bg-gray-100 rounded-md p-2 text-center border border-gray-200'>
//                                 <input
//                                   type='number'
//                                   value={tempEditedMeal?.proteins || ""}
//                                   onChange={(e) =>
//                                     handleUpdateTempMeal(
//                                       "proteins",
//                                       parseInt(e.target.value) || 0
//                                     )
//                                   }
//                                   className='w-full text-sm font-bold text-gray-700 bg-transparent text-center outline-none'
//                                   placeholder='0'
//                                 />
//                                 <div className='text-xs text-gray-500'>
//                                   proteínas
//                                 </div>
//                               </div>
//                               <div className='bg-gray-100 rounded-md p-2 text-center border border-gray-200'>
//                                 <input
//                                   type='number'
//                                   value={tempEditedMeal?.carbohydrates || ""}
//                                   onChange={(e) =>
//                                     handleUpdateTempMeal(
//                                       "carbohydrates",
//                                       parseInt(e.target.value) || 0
//                                     )
//                                   }
//                                   className='w-full text-sm font-bold text-gray-700 bg-transparent text-center outline-none'
//                                   placeholder='0'
//                                 />
//                                 <div className='text-xs text-gray-500'>
//                                   carbohidratos
//                                 </div>
//                               </div>
//                               <div className='bg-gray-100 rounded-md p-2 text-center border border-gray-200'>
//                                 <input
//                                   type='number'
//                                   value={tempEditedMeal?.fats || ""}
//                                   onChange={(e) =>
//                                     handleUpdateTempMeal(
//                                       "fats",
//                                       parseInt(e.target.value) || 0
//                                     )
//                                   }
//                                   className='w-full text-sm font-bold text-gray-700 bg-transparent text-center outline-none'
//                                   placeholder='0'
//                                 />
//                                 <div className='text-xs text-gray-500'>
//                                   grasas
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ) : (
//                           // Modo visualización - compacto y elegante
//                           <div className='p-3'>
//                             <div className='flex justify-between items-start mb-2'>
//                               <div className='flex-1'>
//                                 <div className='flex items-center space-x-2 mb-1'>
//                                   <h3 className='font-semibold text-gray-800 text-sm'>
//                                     {meal.name}
//                                   </h3>
//                                   <span className='text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full'>
//                                     {meal.time}
//                                   </span>
//                                 </div>
//                               </div>
//                               <div className='flex space-x-1'>
//                                 <button
//                                   onClick={() => handleEditMeal(meal)}
//                                   className='p-1 text-gray-400 hover:text-blue-500 rounded transition-colors'>
//                                   <PencilSquareIcon className='h-3 w-3' />
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeleteMeal(meal.id)}
//                                   className='p-1 text-gray-400 hover:text-red-500 rounded transition-colors'>
//                                   <TrashIcon className='h-3 w-3' />
//                                 </button>
//                               </div>
//                             </div>

//                             <div className='grid grid-cols-4 gap-2'>
//                               <div className='bg-orange-50 rounded-md p-2 text-center'>
//                                 <div className='text-sm font-bold text-orange-700'>
//                                   {meal.calories}
//                                 </div>
//                                 <div className='text-xs text-orange-600'>
//                                   kcal
//                                 </div>
//                               </div>
//                               <div className='bg-red-50 rounded-md p-2 text-center'>
//                                 <div className='text-sm font-bold text-red-700'>
//                                   {meal.proteins}g
//                                 </div>
//                                 <div className='text-xs text-red-600'>
//                                   proteínas
//                                 </div>
//                               </div>
//                               <div className='bg-yellow-50 rounded-md p-2 text-center'>
//                                 <div className='text-sm font-bold text-yellow-700'>
//                                   {meal.carbohydrates}g
//                                 </div>
//                                 <div className='text-xs text-yellow-600'>
//                                   carbohidratos
//                                 </div>
//                               </div>
//                               <div className='bg-green-50 rounded-md p-2 text-center'>
//                                 <div className='text-sm font-bold text-green-700'>
//                                   {meal.fats}g
//                                 </div>
//                                 <div className='text-xs text-green-600'>
//                                   grasas
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     {/* Mensaje cuando no hay comidas */}
//                     {filteredMeals.length === 0 && (
//                       <div className='bg-gray-50 rounded-lg p-6 text-center border-2 border-dashed border-gray-300'>
//                         <div className='flex flex-col items-center space-y-3'>
//                           <div className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center'>
//                             <span className='text-xl'>🍽️</span>
//                           </div>
//                           <div>
//                             <h3 className='text-base font-semibold text-gray-700 mb-1'>
//                               No hay comidas registradas
//                             </h3>
//                             <p className='text-gray-500 text-sm max-w-sm mx-auto'>
//                               Añade tu primera comida del día para comenzar a
//                               hacer seguimiento de tu alimentación.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Botón añadir comida - con colores de la paleta y más compacto */}
//                     <button
//                       className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-3'
//                       onClick={() => setIsModalOpen(true)}>
//                       <div className='flex items-center justify-center space-x-2'>
//                         <PlusIcon className='h-4 w-4' />
//                         <span className='font-medium text-sm'>
//                           Añadir nueva comida
//                         </span>
//                       </div>{" "}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Columna derecha - Calendario */}
//           <div className='hidden md:flex p-4 md:sticky md:top-0 md:h-screen md:mr-10 lg:mr-25 overflow-hidden items-start justify-center'>
//             <div className='space-y-4'>
//               <div className='bg-white rounded-lg shadow-sm p-4'>
//                 <h4 className='text-lg font-semibold mb-4 text-gray-800'>
//                   Calendario de Comidas
//                 </h4>
//                 <MiniCalendar
//                   selectedDate={selectedDate}
//                   onDateSelect={handleDateSelect}
//                   renderDay={renderCalendarDay}
//                 />

//                 <div className='mt-4 space-y-3'>
//                   <div className='flex items-center text-sm'>
//                     <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
//                     <span className='text-gray-600'>Comidas registradas</span>
//                   </div>

//                   <div className='border-t pt-3'>
//                     <h5 className='font-medium text-gray-800 mb-2'>
//                       Estadísticas del mes
//                     </h5>
//                     <div className='space-y-2'>
//                       <div className='flex items-center justify-between text-sm'>
//                         <span className='text-gray-600'>Días con comidas:</span>
//                         <span className='font-medium text-gray-800'>
//                           {monthStats.daysWithMeals}
//                         </span>
//                       </div>
//                       <div className='flex items-center justify-between text-sm'>
//                         <span className='text-gray-600'>Total comidas:</span>
//                         <span className='font-medium text-gray-800'>
//                           {monthStats.totalMeals}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <AddMealModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAdd={handleAddMeal}
//         selectedDate={selectedDate}
//       />
//     </div>
//   );
// }
