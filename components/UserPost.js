'use client'

import Image from "next/image";

import { TiThumbsUp } from "react-icons/ti";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { useState } from "react";

export default function UserPost({ username }) {

    const [showAllComments, setShowAllComments] = useState(false);

    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    }

    return (
        <>

            <div className=" bg-slate-300 bg-opacity-15 p-3 rounded-lg text-white w-[685px]">

                <div className=" flex space-x-3 items-center">
                    <div>
                        <Image src={''} alt="post owner" width={35} height={35} className=" rounded-full bg-red-500" />
                    </div>
                    <div>
                        <h2 className=" text-white">{username}</h2>
                        <h3 className=" text-sm">Create time</h3>
                    </div>
                </div>

                <div className=" p-2 mt-3">
                    <h1>Caption</h1>
                </div>

                <div className=" mt-3">
                    <Image src={''} alt="post img" width={200} height={100} className=" rounded-lg bg-amber-500 w-auto" />
                </div>

                <div className=" mt-3 border-t-[.5px] border-b-[.5px] flex space-x-3 justify-between w-auto p-3 items-center">

                    <div className=" py-2 px-4 cursor-pointer flex space-x-2 items-center hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg duration-200">
                        <TiThumbsUp className=" text-2xl" />
                        <h1>Like</h1>
                    </div>

                    <div onClick={toggleComments} className=" py-2 px-4 cursor-pointer flex space-x-2 items-center hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg duration-200">
                        <FaRegCommentAlt className=" text-xl" />
                        <h1>Comment</h1>
                    </div>

                    <div className=" py-2 px-4 cursor-pointer flex space-x-2 items-center hover:bg-slate-300 hover:bg-opacity-15 hover:rounded-lg rounded-lg duration-200">
                        <PiShareFat className=" text-xl" />
                        <h1>Share</h1>
                    </div>
                </div>

                <div className=" mt-2 p-3">

                    <div className=" flex space-x-3 items-center mb-3">
                        <div>
                            <Image src={''} alt="post owner" width={30} height={30} className=" rounded-full bg-lime-600" />
                        </div>
                        <div>
                            <h2 className=" text-white">Comment owner</h2>
                            <h3 className=" text-sm">Comment</h3>
                        </div>
                    </div>

                    {showAllComments && (
                        <>
                            <div className="flex space-x-3 items-center mb-3">
                                <div>
                                    <Image src={''} alt="comment owner" width={30} height={30} className="rounded-full bg-lime-600" />
                                </div>
                                <div>
                                    <h2 className="text-white">Comment owner</h2>
                                    <h3 className="text-sm">Comment</h3>
                                </div>
                            </div>

                            <div className="flex space-x-3 items-center">
                                <div>
                                    <Image src={''} alt="comment owner" width={30} height={30} className="rounded-full bg-lime-600" />
                                </div>
                                <div>
                                    <h2 className="text-white">Comment owner</h2>
                                    <h3 className="text-sm">Comment</h3>
                                </div>
                            </div>
                        </>
                    )}

                </div>

            </div>

        </>
    );
}