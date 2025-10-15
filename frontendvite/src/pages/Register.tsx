import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formInfo, setFormInfo] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    setLoading(true);
    setError("");

    try {
      // Check for empty fields
      if (
        !formInfo.username ||
        !formInfo.email ||
        !formInfo.password ||
        !formInfo.confirmPassword
      ) {
        setError("Please fill in all fields.");
        return;
      }

      if (formInfo.password !== formInfo.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await register(formInfo.username, formInfo.email, formInfo.password);

      // Navega al home después del registro exitoso
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup failed:", error.message);
      } else {
        console.error("Signup failed:", error);
      }
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-200 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="w-8 h-8 mr-2"
            src={logo}
            alt="logo"
          />
          pressLoad
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {error && <p className="text-danger">{error}</p>}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleRegister}
            >
              <div>
                <label
                  htmlFor="email"
                  className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@mail.com"
                  required={true}
                  value={formInfo.email}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
                             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required={true}
                  value={formInfo.username}
                  onChange={(e) =>
                    setFormInfo({ ...formInfo, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 flex w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required={true}
                  value={formInfo.password}
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                             dark:focus:border-blue-500"
                  required={true}
                  value={formInfo.confirmPassword}
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              {/*<div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div> */
              /* <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value={premium}
                  className="sr-only peer"
                  onChange={(e) => setPremium(e.target.value)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Premium User ?
                </span>
              </label> */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800
                        disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating account..." : "Create an account"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
