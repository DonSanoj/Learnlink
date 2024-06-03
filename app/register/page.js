'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import bcrypt from 'bcryptjs';

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        birthday: "",
        educationLevel: "",
        contactNumber: "",
        email: "",
        password: "",
        cPassword: "",
    });

    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step === 1) {
            const { username, birthday, educationLevel, contactNumber } = formData;

            if (!username || !birthday || !educationLevel || !contactNumber) {
                setMessage("All fields are required");
                return;
            }
            const today = new Date();
            const selectedDate = new Date(birthday);
            if (selectedDate > today) {
                setMessage("Birthday cannot be in the future.");
                return;
            }

            const initialData = { username, birthday, educationLevel, contactNumber };
            localStorage.setItem("formData", JSON.stringify(initialData));
            setMessage('');
            setStep(2);

        } else if (step === 2) {
            const { email, password } = formData;

            if (!email || !password || !formData.cPassword) {
                setMessage("All fields are required.");
                return;
            }
            if (password !== formData.cPassword) {
                setMessage("Passwords do not match.");
                return;
            }
            if (!/^[A-Za-z0-9]{8,}$/.test(password)) {
                setMessage("Password must be at least 8 characters.");
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const initialData = JSON.parse(localStorage.getItem("formData"));
            const userData = { ...initialData, email, password: hashedPassword };

            try {
                const registerResponse = await fetch('http://localhost:8080/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (registerResponse.ok) {
                    localStorage.removeItem("formData");
                    localStorage.setItem("username", initialData.username);
                    localStorage.setItem("email", email);
                    router.push(`/${formData.username}`);
                } else {
                    const errorData = await registerResponse.json();
                    setMessage(errorData.message || "Registration failed.");
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setMessage("Registration failed.");
            }
        }
    };


    return (
        <section className="flex justify-center items-center h-screen">
            <form className="w-[400px] p-6 bg-white shadow-lg rounded-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-4 text-center">Create an account</h1>

                {step === 1 && (
                    <>
                        {message && <p className=" text-red-500 text-center text-base">{message}</p>}

                        <div className="flex mb-4 space-x-4">
                            <div className="flex-1">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                                <input
                                    id="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday:</label>
                                <input
                                    id="birthday"
                                    type="date"
                                    required
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">Education Level:</label>
                            <select
                                id="educationLevel"
                                required
                                value={formData.educationLevel}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <option value="">Select an education level</option>
                                <option value="school">School</option>
                                <option value="highSchool">High School</option>
                                <option value="bachelors">Bachelor's Degree</option>
                                <option value="masters">Master's Degree</option>
                                <option value="doctorate">Doctorate</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number:</label>
                            <div className="flex space-x-2">
                                <select
                                    id="countryCode"
                                    required
                                    value={formData.countryCode}
                                    onChange={handleChange}
                                    className="mt-1 block w-[50%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+91">+91 (India)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+61">+61 (Australia)</option>
                                    <option value="+94">+94 (Sri Lanka)</option>
                                    {/* Add more country codes as needed */}
                                </select>
                                <input
                                    id="contactNumber"
                                    type="tel"
                                    required
                                    pattern="\d*"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        {message && <p className=" text-red-500 text-center text-base">{message}</p>}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                            <input
                                id="cPassword"
                                type="password"
                                required
                                value={formData.cPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-center items-center space-x-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {step === 1 ? "Next" : "Register"}
                    </button>
                    {step === 2 && (
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
}
