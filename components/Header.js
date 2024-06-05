import Link from 'next/link';
import Image from 'next/image';

import { IoSearchSharp } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import { FaCalendarDay } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaBell } from 'react-icons/fa';
import { IoSettingsSharp } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import { IoIosHelpCircle } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";

import { useEffect, useRef, useState } from 'react';
import Logout from './Logout';
import { useRouter } from 'next/navigation';

export default function Header({ username }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="bg-[#2b2b2b] p-2 shadow-md border-b-[.01px] fixed z-[100] w-full mx-auto px-8 flex items-center justify-between">
                <nav className="flex items-center space-x-4">
                    <Link href={'/'}>
                        <Image src={'/learnlink.png'} width={50} height={50} alt="Learn Link Logo" className="cursor-pointer" />
                    </Link>

                    <div className="relative">
                        <IoSearchSharp className="absolute top-1/2 transform -translate-y-1/2 left-3 text-white text-xl" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-[#3b3b3b] text-white p-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-16 pl-24">
                        <Link href={'/'} className="hover:text-blue-500 hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg p-2 px-8 text-2xl transition duration-200 text-white">
                            <AiFillHome />
                        </Link>
                        <Link href={'/'} className="hover:text-blue-500 hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg p-2 px-8 text-2xl transition duration-200 text-white">
                            <FaCalendarDay />
                        </Link>
                        <Link href={'/'} className="hover:text-blue-500 hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg p-2 px-8 text-2xl transition duration-200 text-white">
                            <FaUsers />
                        </Link>
                    </div>
                </nav>

                <nav className="flex items-center space-x-4">
                    <Link href={'/'} className="hover:text-blue-500 bg-slate-300 bg-opacity-15 rounded-full p-2 text-2xl transition duration-200 text-white">
                        <FaBell />
                    </Link>
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="cursor-pointer"
                            onClick={toggleDropdown}
                        >
                            <Image src={''} width={40} height={40} className="bg-cyan-600 rounded-full" alt="profile" />
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <nav className="flex flex-col gap-2 p-6 w-80 bg-[#2d2d2c] text-white rounded-lg shadow-lg border-none text-[18px]">

                                    <Link href={`/${username}`}
                                        className=" flex items-center p-2 hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg transition duration-200 mb-4">

                                        <Image src={''} width={30} height={30} className="bg-cyan-600 rounded-full" alt="profile" />
                                        <div className=' ml-3 text-xl'>{username ? `${username}` : 'Guest'}</div>

                                    </Link>
                                    <hr />

                                    <Link href={'/'} className="flex items-center transition p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200">
                                        <IoSettingsSharp className="text-4xl mr-4 bg-slate-300 bg-opacity-15 rounded-full p-2" />
                                        <span className="flex-grow">Settings</span>
                                        <FaChevronRight className="text-xl ml-2 text-gray-500" />
                                    </Link>

                                    <Link href={'/'} className=" flex items-center transition p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200">
                                        <MdFeedback className="text-4xl mr-4 bg-slate-300 bg-opacity-15 rounded-full p-2" />
                                        <span className="flex-grow">Give feedback</span>
                                        <FaChevronRight className="text-xl ml-2 text-gray-500" />
                                    </Link>

                                    <Link href={'/'} className=" flex items-center transition p-2 hover:bg-slate-300 hover:bg-opacity-15 text-lg hover:rounded-lg rounded-lg duration-200">
                                        <IoIosHelpCircle className="text-4xl mr-4 bg-slate-300 bg-opacity-15 rounded-full p-2" />
                                        <span className=' flex-grow'>Help and support</span>
                                        <FaChevronRight className="text-xl ml-2 text-gray-500" />
                                    </Link>

                                    <div className=' p-2 flex items-center hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg'>
                                        <IoLogOut className="text-4xl mr-4 bg-slate-300 bg-opacity-15 rounded-full p-2" />
                                        <Logout />
                                    </div>

                                </nav>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}
