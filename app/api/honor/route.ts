import { auth } from "@/lib/nextauth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    let session = await auth();
    let { name, description, level_of_recognition, grade_received } = await req.json();

    // TODO - if rapidly requesting, don't let it pass without checking consequently
    // TODO - extend the limit based on plan
    let honors = await prisma.honor.findMany({ where: { userId: session.user.id } });
    if (honors.length >= 10) return Response.json({ error: "You have reached the limit for your plan." }, { status: 400 });

    let n = name.trim();
    let d = description.trim();

    // TODO - extend the limit based on plan
    if (n.length === 0 || n.length > 100) return Response.json({ error: "Name must be between 1 and 100 characters." }, { status: 400 });
    if (d.length === 0 || d.length > 1000) return Response.json({ error: "Description must be between 1 and 1000 characters." }, { status: 400 });
    if (!level_of_recognition) return Response.json({ error: "Level of recognition is required." }, { status: 400 });
    if (!grade_received) return Response.json({ error: "Grade received is required." }, { status: 400 });

    let honor = await prisma.honor.create({
        data: {
            userId: session.user.id,
            name: n,
            description: d,
            level_of_recognition,
            grade_received
        }
    });

    return Response.json(honor);
}