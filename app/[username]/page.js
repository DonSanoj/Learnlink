'use client'

import Header from '@/components/Header';
import { notFound } from 'next/navigation';

export default function UserProfile({ params }) {
    const { username } = params;

    if (!username) {
        notFound();
    }

    return (
        <>
            <Header />
            <div>
                <h1>Welcome, {username}!</h1>
                <p>This is your profile page.</p>
            </div>
        </>
    );
}
