import prisma from "@/lib/prisma";
import { auth } from "@/lib/nextauth";
import AccessPage from "./AccessPage";
import CantAccessPage from "./CantAccessPage";
import { notFound } from "next/navigation";

export default async function UserPage({ params }: { params: { id: string } }) {
    try {
        let session = await auth();

        // Load page owner
        let user = await prisma.user.findUnique({ where: { id: params.id }, include: { activities: true, cohorts: true, honors: true, invitations: true } });

        // Check basic permission to view page
        let canView = session.user.admin || user.id === session.user.id;

        // Check if collaborator
        if (!canView) {
            let collaborator = await prisma.collaborator.findFirst({
                where: {
                    userId: user.id,
                    invitedId: session.user.id // am I invited?
                }
            });
            canView = !!collaborator;
        }

        // Can view page
        if (canView) return <AccessPage user={user} me={session.user.id} />

        // Can't view page
        return <CantAccessPage user={user} />
    } catch (error) {
        return notFound();
    }
}