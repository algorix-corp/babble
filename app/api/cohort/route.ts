import { auth } from "@/lib/nextauth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    let session = await auth();
    let { name, private: p } = await req.json();

    // TODO - if rapidly requesting, don't let it pass without checking consequently
    // TODO - extend the limit based on plan
    let cohorts = await prisma.cohort.findMany({ where: { userId: session.user.id } });
    if (cohorts.length >= 5) return Response.json({ error: "You have reached the limit for your plan." }, { status: 400 });

    let n = name.trim();

    // TODO - extend the limit based on plan
    if (n.length === 0 || n.length > 100) return Response.json({ error: "Name must be between 1 and 100 characters." }, { status: 400 });

    let cohort = await prisma.cohort.create({
        data: {
            userId: session.user.id,
            name: n,
            private: p
        }
    });

    return Response.json(cohort);
}