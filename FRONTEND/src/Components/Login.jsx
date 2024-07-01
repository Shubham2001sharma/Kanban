// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import axios from "axios";
//import PaymentModal from "./PaymentModal"; // Assuming you have a PaymentModal component

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("kanban-backend-woad.vercel.app/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        
          navigate("/dashboard");
        }
       
        setError("Login failed. Please check your username and password.");
      
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  
  }
  const handleRegister = () => {
    navigate("/register");
  };
  
  

  return (
    <>
      <section className="h-screen pt-10 pb-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white flex justify-center">
        <div className="bg-black w-full md:max-w-md shadow-lg rounded-lg overflow-hidden">
          <div className="px-6">
            <div className="text-center">
              <img
                className="mx-auto w-24 md:w-48 mt-10"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
              />
              <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                <span className="text-shadow-md">K</span>
                <span className="text-shadow-lg">A</span>
                <span className="text-shadow-xl">N</span>
                <span className="text-shadow-xl">B</span>
                <span className="text-shadow-lg">A</span>
                <span className="text-shadow-md">N</span> APP
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              {error && (
                <div className="mb-4 text-red-500 text-center">{error}</div>
              )}
              <div className="mb-4">
                <TEInput
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="mb-3">
                <TEInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                />
              </div>
              <div className="flex justify-center mb-4">
                <Link
                  to="/forgot-password"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mb-6">
                <TERipple rippleColor="" className="">
                  <button
                    className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-3 rounded-md w-full"
                    type="submit"
                  >
                    Log in
                  </button>
                </TERipple>
              </div>

              <div className="flex">
                <span className="mr-10">Do not have an account?</span>
                <TERipple rippleColor="">
                  <button
                    type="button"
                    className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default Login;
