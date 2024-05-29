import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen brightness-animation">
            <Image src={'/learnlink.png'} width={300} height={300} alt="Learn Link Logo" />
        </div>
    );
}