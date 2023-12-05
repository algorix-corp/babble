import { auth } from "@/lib/nextauth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    let session = await auth();
    let { email } = await req.json();

    // TODO - if rapidly requesting, don't let it pass without checking consequently
    // TODO - extend the limit based on plan
    let collaborators = await prisma.collaborator.findMany({ where: { userId: session.user.id } });
    if (collaborators.length >= 10) return Response.json({ error: "You have reached the limit for your plan." }, { status: 400 });

    let e = email.trim();

    // TODO - extend the limit based on plan
    if (e.length === 0) return Response.json({ error: "Email is required." }, { status: 400 });

    let i = await prisma.user.findUnique({ where: { email: e } });
    if (!i) return Response.json({ error: "User not found." }, { status: 400 });

    let collaborator = await prisma.collaborator.create({
        data: {
            userId: session.user.id,
            invitedId: i.id
        }
    });

    return Response.json(collaborator);
}

export async function DELETE(req: Request) {
    let session = await auth();
    let { id } = await req.json();

    await prisma.collaborator.deleteMany({
        where: {
            userId: id,
            invitedId: session.user.id
        }
    });

    return Response.json({ success: true });
}