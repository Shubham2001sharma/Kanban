// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed import
import { TEInput } from "tw-elements-react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // Renamed to navigate for consistency
    


    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            // Ensure email is defined before making the request
            if (!email) {
                console.error("Email is required.");
                return;
            }
    
            const response = await axios.post("http://localhost:3000/forgot-password", {
                email
            });
    
            console.log(response.data);
            if (response.data.status === 'success') {
                navigate('/'); // Used navigate instead of navigateto
                setEmail(''); // Clear the email input field after successful request
            }
    
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };
    
    return (
        <section className="h-screen pt-20 pb-32 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white flex justify-center">
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

                    <form onSubmit={handleForgotPassword} className="mt-8">
                        <div className="mb-4">
                            <TEInput
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                            SEND
                        </button>
                        <Link to='/'>
                            <button className="ml-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                                GO BACK
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
