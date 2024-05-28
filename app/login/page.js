'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const [message, setMessage] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: isAdminLogin ? adminUsername : username,
                    password: isAdminLogin ? adminPassword : password,
                    isAdmin: isAdminLogin,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                if (isAdminLogin) {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        if (value === 'sudo') {
            setIsAdminLogin(true);
            setMessage('Please enter admin credentials');
        } else {
            setIsAdminLogin(false);
            setMessage('');
        }
    };

    return (
        <>
            {!isAdminLogin ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                    {message && <p>{message}</p>}
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Admin Username:
                        <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} />
                    </label>
                    <label>
                        Admin Password:
                        <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                    {message && <p>{message}</p>}
                </form>
            )}

            <Link href={'/register'}>Create Account</Link>
        </>
    );
}
