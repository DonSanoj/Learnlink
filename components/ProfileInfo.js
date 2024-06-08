export default function ProfileInfo() {
    return (
        <>

            <div className="bg-slate-300 bg-opacity-15 p-4 mt-[-355px] rounded-lg text-white w-[300px] h-[350px]">
                <h1 className=" text-xl">Information</h1>

                <div className=" text-base mt-5">
                    <h2 className=" mt-3">Bio</h2>
                    <h2 className=" mt-3">College</h2>
                    <h2 className=" mt-3">Address</h2>
                    <h2 className=" mt-3">Interesting</h2>
                </div>

                <div className=" mt-20">
                    <button className=" bg-blue-500 p-3 w-full rounded-lg text-lg">
                        Edit Information
                    </button>
                </div>

            </div>

        </>
    );
}