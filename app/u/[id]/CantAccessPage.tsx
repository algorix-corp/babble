import { IconLock } from "@tabler/icons-react";
import Image from "next/image";

// TODO - higher res image
export default function CantAccessPage({ user }: { user: any }) {
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col">
            <Image src={user.picture} width={300} height={300} alt="Profile picture" className="rounded-full" />

            <div className="flex items-center mt-12">
                <IconLock size={48} />
                <p className="text-4xl font-bold ml-2">{user.name}</p>
            </div>

            <p className="text-gray-500 mt-1">You are not their collaborator yet... just yet.</p>
        </div>
    );
}