import Image from 'next/image';
import Link from 'next/link';

import { IoDocumentText } from "react-icons/io5";
import { FaCalendarDay } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useState } from 'react';

export default function HomeSideBar({ username }) {

    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);

    const toggleGroupDropdown = () => {
        setIsGroupDropdownOpen(!isGroupDropdownOpen);
    }

    const toggleClassDropdown = () => {
        setIsClassDropdownOpen(!isClassDropdownOpen);
    }

    return (

        <section className='p-4 w-72 h-screen fixed bg-[#1c1e21]'>

            <div className='flex items-center mt-5 p-3 bg-slate-300 bg-opacity-15 text-lg rounded-lg duration-200 space-x-2'>
                <Link href={'/'} className=' flex space-x-3'>
                    <div className='bg-cyan-600 rounded-full'>
                        <Image src={''} width={30} height={30} className='rounded-full' alt='profile' />
                    </div>
                    <div className='text-xl text-white'>{username ? username : 'Guest'}</div>
                </Link>
            </div> <hr className=' mt-2' />

            <ScrollArea className="h-[390px] mr-4 w-64 overflow-auto rounded-md">

                <div className=' text-white p-2 mt-3 text-lg'>

                    <div className='space-y-2'>
                        <div className='flex items-center space-x-2 p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200 justify-between cursor-pointer' onClick={toggleGroupDropdown}>
                            <div className='flex items-center space-x-2'>
                                <FaUsers className='text-xl' />
                                <span>Groups</span>
                            </div>
                            <FaChevronRight className={`text-gray-500 transform transition-transform duration-200 ${isGroupDropdownOpen ? 'rotate-90' : ''}`} />
                        </div>
                        {isGroupDropdownOpen && (
                            <div className='pl-8 space-y-1'>
                                <div className='p-2 flex items-center space-x-2 hover:bg-slate-300 hover:bg-opacity-15 rounded-lg duration-200'>
                                    <Image src={''} width={25} height={25} className='rounded-full bg-purple-500' alt='group' />
                                    <span className='cursor-pointer text-base'>Subgroup 1</span>
                                </div>
                                <div className='p-2 flex items-center space-x-2 hover:bg-slate-300 hover:bg-opacity-15 rounded-lg duration-200'>
                                    <Image src={''} width={25} height={25} className='rounded-full bg-purple-500' alt='group' />
                                    <span className='cursor-pointer text-base'>Subgroup 2</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <div className='flex items-center space-x-2 p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200 justify-between cursor-pointer' onClick={toggleClassDropdown}>
                            <div className='flex items-center space-x-2'>
                                <FaChalkboardTeacher className='text-xl' />
                                <span>Classes</span>
                            </div>
                            <FaChevronRight className={`text-gray-500 transform transition-transform duration-200 ${isClassDropdownOpen ? 'rotate-90' : ''}`} />
                        </div>
                        {isClassDropdownOpen && (
                            <div className='pl-8 space-y-1'>
                                <div className='p-2 flex items-center space-x-2 hover:bg-slate-300 hover:bg-opacity-15 rounded-lg duration-200'>
                                    <Image src={''} width={25} height={25} className='rounded-full bg-purple-500' alt='class' />
                                    <span className='cursor-pointer text-base'>Subclass 1</span>
                                </div>
                                <div className='p-2 flex items-center space-x-2 hover:bg-slate-300 hover:bg-opacity-15 rounded-lg duration-200'>
                                    <Image src={''} width={25} height={25} className='rounded-full bg-purple-500' alt='class' />
                                    <span className='cursor-pointer text-base'>Subclass 2</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className=' flex items-center space-x-2 p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200'>
                        <IoDocumentText className=' text-xl text-gradient-to-r from-blue-500 via-purple-500 to-purple-500' />
                        <Link href={''}>Research</Link>
                    </div>

                    <div className=' flex items-center space-x-2 p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200'>
                        <FaCalendarDay className=' text-xl' />
                        <Link href={''}>Events</Link>
                    </div>

                    <div className=' flex items-center space-x-2 p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200'>
                        <HiSpeakerphone className=' text-xl' />
                        <Link href={''}>Ads</Link>
                    </div>

                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

        </section >


    );
}
