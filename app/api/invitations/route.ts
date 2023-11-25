import { auth } from "@/lib/nextauth";
import prisma from "@/lib/prisma";

export async function GET() {
    let session = await auth();

    // Get users from collaborators
    let invitations = await prisma.collaborator.findMany({
        where: { invitedId: session.user.id },
        include: {
            user: true
        }
    });

    return Response.json(invitations);
}