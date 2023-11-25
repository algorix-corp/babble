import { auth } from "@/lib/nextauth";
import { redirect } from "next/navigation";

// ME
export async function GET() {
    let session = await auth();
    redirect(`/u/${session.user.id}`);
}