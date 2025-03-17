import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const handleLogin = () => {
      navigate('/register'); // Navegar al register
    };
  

    return (
      <div className="flex mt-[10%] min-w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        
        {/* Imagen del lado izquierdo */}
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltc3xlbnwwfHwwfHx8MA%3D%3D')`,
          }}
        ></div>
  
        {/* Contenedor del formulario */}
        <div className="flex items-center w-full h-auto lg:w-1/2">
          <div className="w-full p-6 md:p-8">
            
            {/* Logo */}
            <div className="flex justify-center mx-auto mb-4">
              <img className="w-auto h-8" src={logo} alt="image logo" />
            </div>
  
            {/* Título */}
            <p className="text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome to pressLoad!
            </p>
  
            <form className="mt-4 flex flex-col gap-4">
              
              {/* Input Email */}
              <div>
                <label
                  htmlFor="LoggingEmailAddress"
                  className="flex mb-1 text-sm font-medium text-gray-600 dark:text-gray-200"
                >
                  Email Address
                </label>
                <input
                  id="LoggingEmailAddress"
                  className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
                  type="email"
                />
              </div>
  
              {/* Input Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="loggingPassword"
                    className="text-sm font-medium text-gray-600 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    Forget Password?
                  </a>
                </div>
                <input
                  id="loggingPassword"
                  className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:outline-none focus:ring-opacity-40"
                  type="password"
                />
              </div>
  
              {/* Botón de inicio de sesión */}
              <button className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
              </button>
  
              {/* Divider */}
              <div className="flex items-center justify-between">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <a
                  href="#"
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline" onClick={handleLogin}
                >
                  or sign up
                </a>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  