import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import type { NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth"

export const config = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }: { session: Session }) {
            let user = await prisma.user.upsert({
                where: { email: session.user.email },
                update: {
                    name: session.user.name,
                    picture: session.user.image,
                },
                create: {
                    email: session.user.email,
                    name: session.user.name,
                    picture: session.user.image,
                },
            });

            session.user.id = user.id;
            session.user.admin = user.admin;

            return session;
        }
    }
} satisfies NextAuthOptions;

export function auth() {
    return getServerSession(config);
}