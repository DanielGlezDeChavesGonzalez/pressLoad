import { useEffect, useState } from "react";
import userFoto from "../assets/profile-pic.jpg";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { useState } from "react";

import LateralPanel from "../components/LateralPanel";

interface UserData {
  firstName: string;
  lastName: string;
  trainingsCount: number;
  friendsCount: number;
}

export default function Home() {
  // const imageSrc = "../assets/userimage.webp";

  const [userData, setUserData] = useState<UserData>({
    firstName: "John",
    lastName: "Pork",
    trainingsCount: 0,
    friendsCount: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://tu-backend-url/api/user-data");

        if (!response.ok) {
          throw new Error("Error al cargar los datos del usuario");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-row min-h-screen bg-gray-100">
      <LateralPanel />
      <div className="flex-1 flex flex-col sm:flex-row pt-4 max-w-7xl mx-auto">
        {/* Columna izquierda con scroll */}
        <div className="flex-1 overflow-y-auto max-w-3xl mx-auto">
          <div className="flex flex-col items-center space-y-4 max-w-[600px] mx-auto">
            <div className="chart">
              <p className="chart-title">Meals</p>
            </div>
            <div className="chart">
              <p className="chart-title">Routine summary</p>
            </div>
            <div className="chart">
              <p className="chart-title">Meals</p>
            </div>
          </div>
        </div>

        {/* Columna derecha fija */}
        <div className="hidden md:flex p-4 md:sticky md:top-0 md:h-screen md:mr-10 lg:mr-25 overflow-hidden items-start">
          <div className="profile-block">
            {/* Contenido del perfil */}
            <div className="flex flex-col items-center space-y-4 p-4">
              {/* Foto de perfil */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={userFoto}
                  alt="Profile image"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Estadísticas */}
              <div className="flex justify-center space-x-4 w-full">
                {/* Entrenamientos semanales */}
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <span className="font-bold text-xl text-gray-700">
                    {userData?.trainingsCount}
                  </span>
                  <span className="text-xs text-gray-500">trainings</span>
                </div>

                {/* Amigos/Contactos */}
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <span className="font-bold text-xl text-gray-700">
                    {userData?.friendsCount}
                  </span>
                  <span className="text-xs text-gray-500">Friends</span>
                </div>
              </div>
              {/* Información del usuario */}
              <div className="w-full space-y-3">
                {/* Nombre y apellidos */}
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-lg">{userData?.firstName}</p>
                  <p className="text-gray-600 text-sm">{userData?.lastName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
