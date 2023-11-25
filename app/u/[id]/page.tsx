import prisma from "@/lib/prisma";
import { auth } from "@/lib/nextauth";
import AccessPage from "./AccessPage";

// TODO - possibly optimizable
// export async function generateStaticParams() {
//     // Load every user using prisma
//     let users = await prisma.user.findMany();

//     // Return every user's ID
//     return users.map(user => ({
//         id: user.id
//     }));
// }

export default async function UserPage({ params }: { params: { id: string } }) {
    let session = await auth();

    // Page owner's user ID
    let id = params.id;

    // Check basic permission to view page
    let canView = session.user.admin || id === session.user.id;

    // Check if collaborator
    if (!canView) {
        let collaborator = await prisma.collaborator.findFirst({
            where: {
                userId: id,
                invitedId: session.user.id // am I invited?
            }
        });
        canView = !!collaborator;
    }

    // Can view page
    if (canView) return <AccessPage id={id} self={id === session.user.id} />

    // Can't view page
    return (
        <div>

        </div>
    )
}