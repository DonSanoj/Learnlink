import Image from "next/image";
import Link from "next/link";

export default function CreatePost({username}) {
    return (
        <>

            <div className=" mt-5 mb-4 rounded-lg w-[685px] p-5 bg-slate-300 bg-opacity-15">
                <form>
                    <div className=" text-white flex space-x-3 items-center">

                        <div>
                            <Link href={`/${username}`}>
                                <Image src={''} alt="profile" width={35} height={35} className=" rounded-full bg-cyan-600" />
                            </Link>
                        </div>
                        <input
                            id="post"
                            type=""
                            placeholder=" Creates a new post"
                            className="mt-1 block w-full px-3 py-2 
                            border border-transparent rounded-full shadow-sm 
                            focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50
                            bg-slate-400 bg-opacity-15"
                        />

                    </div>
                </form>
            </div>

        </>
    );
}