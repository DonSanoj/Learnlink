'use client'

import Image from "next/image";
import Link from "next/link";

import { FaCalendarDay } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";

export default function Profile({ username }) {
    return (
        <>

            <div className=" bg-slate-300 bg-opacity-15 p-3 rounded-lg text-white w-[980px] h-[450px] mt-4">

                <div className="relative">
                    <Image src={''} alt="Cover image" width={980} height={250} className="bg-violet-500 rounded-lg" />
                    
                        <button className=" z-50 absolute p-2 bottom-2 right-4 flex space-x-2 items-center 
                                    bg-slate-700 text-white text-base rounded-full hover:bg-slate-300 hover:bg-opacity-15 transition">
                            <FaCirclePlus />
                            <h1>Add new photo</h1>
                        </button>
                    
                </div>

                <div className="relative mt-[-60px] ml-5">
                    <Image src={''} alt="profile image" width={150} height={150} className="rounded-full bg-cyan-500 border" />
                    
                        <button className="absolute top-32 left-32 transform -translate-x-1/2 -translate-y-1/2 bg-slate-700 text-white p-1 rounded-full text-xl transition">
                            <FaCirclePlus />
                        </button>
                    
                </div>

                <div className=" flex justify-between items-center">

                    <div>
                        <h1 className=" text-[34px] ml-7 mt-2">{username}</h1>
                        <h2 className=" text-lg ml-7">Followers No</h2>
                    </div>

                    
                        <div className="flex space-x-3 items-center p-3">
                            <div className="flex space-x-2 p-2 bg-slate-300 bg-opacity-15 hover:bg-slate-300 hover:bg-opacity-10 hover:rounded-lg rounded-lg transition duration-200 text-white items-center">
                                <FaUsers className='text-xl' />
                                <Link href={''}>Group</Link>
                            </div>
                            <div className="flex space-x-2 p-2 bg-slate-300 bg-opacity-15 hover:bg-slate-300 hover:bg-opacity-10 hover:rounded-lg rounded-lg transition duration-200 text-white items-center">
                                <FaChalkboardTeacher className='text-xl' />
                                <Link href={''}>Classes</Link>
                            </div>
                            <div className="flex space-x-2 p-2 bg-slate-300 bg-opacity-15 hover:bg-slate-300 hover:bg-opacity-10 hover:rounded-lg rounded-lg transition duration-200 text-white items-center">
                                <FaCalendarDay className='text-xl' />
                                <Link href={''}>Events</Link>
                            </div>
                        </div>
                    
                        <button className="flex space-x-2 p-2 bg-slate-700 text-white text-base rounded-lg hover:bg-slate-300 hover:bg-opacity-15 transition">
                            <FaUsers className='text-xl' />
                            <h1>Follow</h1>
                        </button>
                    

                </div>

            </div>

        </>
    );
}