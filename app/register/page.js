'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {

    const [formData, setFormData] = useState({
        username: "",
        birthday: "",
        educationLevel: "",
        contactNumber: ""
    });

    const [step, setStep] = useState(1);
    const router = useRouter();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step === 1) {
            const { username, birthday, educationLevel } = formData;
            const initialData = { username, birthday, educationLevel };
            localStorage.setItem("formData", JSON.stringify(initialData));
            console.log("Form data stored", initialData);
            setStep(2);
        } else if (step === 2) {
            localStorage.setItem("contactNumber", formData.contactNumber);
            console.log("Contact number stored", formData.contactNumber);
            router.push(`/${formData.username}`)
        }
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <form className="w-[400px] p-6 bg-white shadow-lg rounded-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-4 text-center">Create an account</h1>

                {step === 1 && (
                    <>
                        <div className="mb-4">
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

                        <div className="mb-4">
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
                    </>
                )}

                {step === 2 && (
                    <div className="mb-4">
                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number:</label>
                        <div className="flex">
                            <select
                                id="countryCode"
                                required
                                value={formData.countryCode}
                                onChange={handleChange}
                                className="mt-1 block w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
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
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>
                    </div>

                )}

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 rounded-md mt-4">
                    {step === 1 ? "Next" : "Submit"}
                </button>

                <div className="mt-4 text-center text-sm">
                    <h3>Already have an Account?</h3>
                    <Link href="/login" className="text-blue-500 hover:text-blue-600 text-lg">Login Now</Link>
                </div>
            </form>
        </section>
    );
}
