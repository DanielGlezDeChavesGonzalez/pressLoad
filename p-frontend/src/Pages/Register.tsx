import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"
import { useState } from "react";

export default function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState(''); // State to manage error messages

    const handleRegister = async () => {
        try {
            // Check for empty fields
            if (!username || !email || !password || !confirmPassword) {
                setError('Please fill in all fields.');
                return;
            }
    
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }
    
            // Using fetch to send the POST request
            const response = await fetch('http://localhost:8080/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Tell the server the body is JSON
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                }),
            });
    
            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                // If not, throw an error with the response status text
                const errorData = await response.json();
                throw new Error(errorData.message || 'Signup failed');
            }
    
            // Handle successful signup
            const data = await response.json();
            console.log(data);
            navigate('/login');
        } catch (error) {
            // Handle any errors that occur during the fetch
            if (error instanceof Error) {
                console.error('Signup failed:', error.message);
            } else {
                console.error('Signup failed:', error);
            }
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };
    

    const handleLogin = () => {
      navigate('/login'); // Navegar al register
    };

  return(
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
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                              dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required={true} value={email}
                               onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="username" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                              dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required={true} value={username}
                               onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 flex w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} value={password}
                             onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                             dark:focus:border-blue-500" required={true} value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                            </div>
                            <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          onClick={handleLogin}>Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleRegister}>Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}