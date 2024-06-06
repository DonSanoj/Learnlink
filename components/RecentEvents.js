import Image from "next/image";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function RecentEvents() {
    return (
        <>
            <section className='p-4 w-[280px] h-screen fixed bg-[#1c1e21] text-white'>

                <ScrollArea className="h-[480px] overflow-auto mr-4 w-64 rounded-md">

                    <h1 className=" text-white p-2 mt-5 text-xl">Recent Events</h1>

                    <div id="recent-events" className=" p-6 mt-3 bg-slate-300 bg-opacity-15 w-60 rounded-lg">

                        <Image src={''} alt="recent event" width={200} height={100} className=" bg-blue-600 rounded-lg  mb-2" />
                        Recent event 01

                    </div>

                    <ScrollBar orientation="horizontal" />

                </ScrollArea>

            </section>
        </>
    );
}