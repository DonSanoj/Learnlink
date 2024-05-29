'use client'

import { useEffect, useState } from 'react';
import Logout from "@/components/Logout";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    }, 3000);
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h1>Welcome, {username ? username : 'Guest'}!</h1>
      </div>

      <Logout />
    </>
  );
}
