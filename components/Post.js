import { ScrollArea } from "./ui/scroll-area";

export default function Post() {
    return (
        <>
            <section className='p-4 w-[720px] h-screen bg-[#1c1e21]'>
                <ScrollArea className="h-[480px] overflow-auto mr-4 w-[700px] rounded-md">
                    <h1 className=" text-white">Post</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>

                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                    <h1 className=" p-5">POST</h1>
                </ScrollArea>
            </section>
        </>
    );
}