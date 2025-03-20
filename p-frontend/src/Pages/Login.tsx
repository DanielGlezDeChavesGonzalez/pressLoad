import logo from '../assets/logo.jpg'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();
    const history = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                setError('Please enter both username and password.');
                return;
            }
    
            const response = await axios.get('http://localhost:8081/', {
                params: { username, password }, // Mueve los datos a la propiedad 'params'
            });
            console.log('Login successful:', response.data);
            history('/login');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Si el error es de Axios, maneja el error específico
                console.error('Login failed:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data : 'Invalid username or password.');
            } else if (error instanceof Error) {
                // Si es un error genérico de JavaScript
                console.error('Login failed:', error.message);
                setError(error.message);
            } else {
                // Si el error es de un tipo inesperado
                console.error('An unexpected error occurred:', error);
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleRegister = () => {
      navigate('/register'); // Navegar al register
    };
  

    return (
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                pressLoad    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    {error && <p className="text-danger">{error}</p>}
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="Username" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                            <input type="Username" name="Username" id="Username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 
                            focus:border-primary-600 flex w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                             dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true}
                             value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900
                             rounded-lg focus:ring-primary-600 focus:border-primary-600 flex w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                  <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true}/>
                                </div>
                                <div className="ml-3 text-sm">
                                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
                        " onClick={handleLogin}>Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400" onClick={handleRegister}>
                            Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    );
  }
  