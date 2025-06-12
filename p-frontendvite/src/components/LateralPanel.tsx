import { useState } from "react";
import logo from "../assets/logo.jpg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LateralPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botón de menú móvil */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-gray-900"
        >
          {isOpen ? (
            <XMarkIcon className="h-8 w-8" />
          ) : (
            <Bars3Icon className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Overlay oscuro cuando el menú está abierto en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Panel lateral */}
      <div
        className={`
          fixed lg:relative
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform duration-300 ease-in-out
          flex flex-col flex-none w-[250px] min-h-full bg-[#f9fafb] border-r-1 border-[#d1d5db]
          z-50 lg:z-auto lg:sticky lg:top-0 lg:h-screen lg:mr-5
        `}
      >
        <div className="w-full px-4 py-3">
          {/* Logo y contenido existente */}
          <div className="flex items-center justify-center">
            <a
              href="/"
              className="flex items-center"
            >
              <img
                src={logo}
                className="mr-3 h-6"
                alt="pressLoad Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap">
                pressLoad
              </span>
            </a>
          </div>

          <div className="border-t border-gray-300 my-4" />

          <div className="flex items-center justify-center mt-4">
            <ul className="flex flex-col space-y-4">
              <li className="flex items-center justify-center w-full">
                <a
                  href="/"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
                >
                  Home
                </a>
              </li>
              <li className="flex items-center justify-center w-full">
                <a
                  href="/meals"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
                >
                  Meals
                </a>
              </li>
              <li className="flex items-center justify-center w-full">
                <a
                  href="/routines"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
                >
                  Routines
                </a>
              </li>
              <li className="flex items-center justify-center w-full">
                <a
                  href="/settings"
                  className="text-gray-800 hover:bg-gray-700 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
                >
                  Settings
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-300 my-4" />

          <div className="flex items-center justify-center mt-4">
            <a
              href="/login"
              className="text-gray-800 hover:bg-gray-700 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 focus:outline-none"
            >
              Log in
            </a>
          </div>
          <div className="flex items-center justify-center mt-4">
            <a
              href="/register"
              className="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-primary-600 focus:outline-none dark:focus:ring-primary-800"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
