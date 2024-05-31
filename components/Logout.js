'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Logout() {
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogout = async () => {
        try {
            console.log('Logging out...');
            const response = await fetch('http://localhost:8080/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response);
            const data = await response.json();
            console.log('Data:', data);
            localStorage.clear();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setMessage('Logout failed');
        }
    };

    return (
        <>
            <div>
                <button onClick={handleLogout}>Logout</button>
                {message && <p>{message}</p>}
            </div>
        </>
    );
}
