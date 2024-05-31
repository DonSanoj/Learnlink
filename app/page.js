'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import HomeSideBar from '@/components/HomeSideBar';
import Post from '@/components/Post';
import RecentEvents from '@/components/RecentEvents';

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
      <Header username={username} />
      <br />

      <div className=' mt-6'>
        <HomeSideBar username={username} />
      </div>

      <div className=' mt-6 ml-[286px] flex overflow-x-hidden'>
        <Post />

        <div className=' ml-[-5px]'>
          <RecentEvents />
        </div>
      </div>


    </>
  );
}
