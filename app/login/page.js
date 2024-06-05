'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form');

        try {
            const loginResponse = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: isAdminLogin ? adminUsername : email,
                    password: isAdminLogin ? adminPassword : password,
                    isAdmin: isAdminLogin,
                }),
            });

            const data = await loginResponse.json();
            console.log('Response:', data);

            if (loginResponse.ok) {
                setMessage(data.message);
                if (isAdminLogin) {
                    localStorage.setItem('email', adminUsername);
                    console.log('Stored admin in localStorage');
                    router.push('/admin');
                } else {
                    localStorage.setItem('user_email', data.user.user_email);
                    localStorage.setItem('user_id', data.user.user_id);
                    localStorage.setItem('user_name', data.user.user_name);
                    console.log('Stored user in localStorage');
                    console.log(data.user.user_id);
                    router.push('/');
                }
            } else {
                setMessage(data.error);
                console.log('Login failed:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value === 'sudo') {
            setIsAdminLogin(true);
            setMessage('Please enter admin credentials');
        } else {
            setIsAdminLogin(false);
            setMessage('');
        }
    };

    return (
        <section id='login' className='login max-w-6xl mx-auto border-gray-600 mb-0 sm:mb-8'>
            <div className="flex items-center justify-center mt-24">
                <Image src={'/learnlink.png'} width={300} height={300} alt="Learn Link Logo" />
            </div>

            <div className="mt-24 ml-8 sm:ml-0">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg shadow-slate-400 rounded-md">
                    {message && <p className="text-red-500 text-center text-base">{message}</p>}

                    {!isAdminLogin ? (
                        <>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mt-2 text-[16px] font-medium text-gray-700">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={handleUsernameChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-[16px] font-medium text-gray-700">Password:</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label htmlFor="adminName" className="block mt-6 text-[16px] font-medium text-gray-700">
                                    Admin Username:
                                    <input
                                        id="adminName"
                                        type="text"
                                        value={adminUsername}
                                        onChange={(e) => setAdminUsername(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                </label>
                            </div>
                            <div className="mb-4">
                                <label htmlFor='adminPassword' className="block text-[16px] font-medium text-gray-700">
                                    Admin Password:
                                    <input
                                        id='adminPassword'
                                        type="password"
                                        value={adminPassword}
                                        onChange={(e) => setAdminPassword(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                </label>
                            </div>
                        </>
                    )}

                    <button type="submit" className="w-full bg-blue-500 hover:bg-[#0078D4] mt-3 text-white text-[18px] py-2 px-4 rounded-md">
                        Log in
                    </button>

                    {!isAdminLogin && (
                        <div className="mt-6 text-center text-sm">
                            <h3>Don't have an Account?</h3>
                            <Link href="/register" className="text-blue-500 hover:text-[#0078D4] text-xl">Create new account</Link>
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}
