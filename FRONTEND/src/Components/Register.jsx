/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setEmailError("");
        setPasswordError("");

        if (!email || !password || !firstname || !lastname || !dob || !gender || !mobile) {
            setError("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Invalid email format.");
            return;
        }

        if (password.length < 6 || password.length > 50) {
            setPasswordError("Password must be between 6 and 20 characters.");
            return;
        }

        try {
            const response = await axios.post("kanban-backend-mu.vercel.app/register", {
                email,
                password,
                firstname,
                lastname,
                dob,
                gender,
                mobile
            });

            if (response.status === 201) {
                setSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                setEmail("");
                setPassword("");
                setFirstname("");
                setLastname("");
                setDob("");
                setGender("");
                setMobile("");
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    const handleLogin = () => {
        navigate('/');
    };

    return (
        <>
            <section className="h-screen pb-10 pt-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white flex justify-center ">
                <div className="bg-black w-1/2  shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6">
                        <div className="text-center">
                            <img
                                className="mx-auto w-24 md:w-48 "
                                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                alt="logo"
                            />
                            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                                <span className="text-shadow-md">K</span>
                                <span className="text-shadow-lg">A</span>
                                <span className="text-shadow-xl">N</span>
                                <span className="text-shadow-xl">B</span>
                                <span className="text-shadow-lg">A</span>
                                <span className="text-shadow-md">N</span> APP
                            </h2>
                        </div>

                        <form onSubmit={handleSubmitRegister} className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <TEInput
                                        type="text"
                                        label="First Name"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                                    />
                                </div>
                                <div>
                                    <TEInput
                                        type="text"
                                        label="Last Name"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                                    />
                                </div>
                                <div>
                                    <TEInput
                                        type="date"
                                        label="Date of Birth"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-white">Gender</label>
                                    <div className="mt-2 flex">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={gender === "male"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="form-radio text-blue-500"
                                            />
                                            <span className="ml-2 text-white">Male</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={gender === "female"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="form-radio text-pink-500"
                                            />
                                            <span className="ml-2 text-white">Female</span>
                                        </label>

                                        <label className="inline-flex items-center ml-6">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="transgender"
                                                checked={gender === "transgender"}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="form-radio text-pink-500"
                                            />
                                            <span className="ml-2 text-white">Transgender</span>
                                        </label>

                                    </div>
                                </div>
                                <div className="ml-20">
                                    <TEInput
                                        type="text"
                                        label="Mobile Number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="border-2 border-gray-300 p-3  rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <TEInput
                                        type="email"
                                        label="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                                    />
                                    {emailError && (
                                        <div className="text-red-500 mt-2 text-center">
                                            {emailError}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <TEInput
                                        type="password"
                                        label="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border-2 border-gray-300 p-3 rounded-md w-full focus:outline-none focus:border-blue-500 text-black"
                                    />
                                    {passwordError && (
                                        <div className="text-red-500 mt-2 text-center">
                                            {passwordError}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-500 mb-4 text-center">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="text-green-500 mb-4 text-center">
                                    {success}
                                </div>
                            )}
                            <div className="mb-6">
                                <TERipple rippleColor="" className="w-full">
                                    <button
                                        className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600"
                                        type="submit"
                                    >
                                        SIGN UP
                                    </button>
                                </TERipple>
                            </div>
                            <div className="flex justify-center">
                                <TERipple rippleColor="">
                                    <button
                                        type="button"
                                        className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleLogin}
                                    >
                                        Login
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

export default Register;
