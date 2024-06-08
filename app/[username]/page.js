'use client'

import CreatePost from '@/components/CreatePost';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import Profile from '@/components/Profile';
import ProfileInfo from '@/components/ProfileInfo';
import UserPost from '@/components/UserPost';

import { ScrollArea } from '@/components/ui/scroll-area';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserProfile({ params }) {

    const { username } = params;

    return (
        <>
            <Header username={username} />
            <br />

            <ScrollArea className="w-full h-[530px] overflow-auto rounded-md">
                <section id='profile-hero' className='h-screen bg-[#1c1e21] flex justify-center items-center text-white'>

                    <div className=' items-center'>
                        <Profile username={username} />
                    </div>

                </section>

                <section id='profile-info' className=' bg-[#1c1e21] justify-center items-center text-white flex space-x-5 p-3'>

                    <div>
                        <ProfileInfo />
                    </div>

                    <div>
                        <CreatePost />
                        <UserPost username={username} />
                    </div>

                </section>

            </ScrollArea>

        </>
    );
}
