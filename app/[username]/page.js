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
            <Header username={username} />
            
        </>
    );
}
