import { auth } from "@/lib/nextauth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    let session = await auth();
    let { name, description, participation } = await req.json();

    // TODO - if rapidly requesting, don't let it pass without checking consequently
    // TODO - extend the limit based on plan
    let activities = await prisma.activity.findMany({ where: { userId: session.user.id } });
    if (activities.length >= 15) return Response.json({ error: "You have reached the limit for your plan." }, { status: 400 });

    let n = name.trim();
    let d = description.trim();

    // TODO - extend the limit based on plan
    if (n.length === 0 || n.length > 100) return Response.json({ error: "Name must be between 1 and 100 characters." }, { status: 400 });
    if (d.length === 0 || d.length > 1000) return Response.json({ error: "Description must be between 1 and 1000 characters." }, { status: 400 });
    if (participation.length === 0) return Response.json({ error: "You must select at least one year of participation." }, { status: 400 });

    let activity = await prisma.activity.create({
        data: {
            userId: session.user.id,
            name: n,
            description: d,
            participation
        }
    });

    return Response.json(activity);
}