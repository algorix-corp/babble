import { auth } from "@/lib/nextauth";
import LandingNav from "./LandingNav";

export default async function Landing() {
    let session = await auth();

    return (
        <>
            <LandingNav session={session} />
        </>
    );
}