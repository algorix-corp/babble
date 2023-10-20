'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { Link } from '@nextui-org/link';
import { useRouter } from "next/navigation";

export default function LandingNav() {
    let { status } = useSession();
    let router = useRouter();

    return (
        <Navbar >
            <NavbarBrand>
                <Link href="#" color="foreground" as={NextLink}>
                    <h1 className="font-medium">Babble</h1>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem>
                    <Link href="#about" color="foreground" as={NextLink}>
                        About
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="#plans" color="foreground" as={NextLink}>
                        Plans
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    {status === "loading" ? <div /> : status === "authenticated" ? (
                        <>
                            <Button variant="solid" onClick={() => router.push("/dashboard")} className="mr-3">
                                Dashboard
                            </Button>

                            <Button variant="ghost" onClick={() => signOut()}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button variant="ghost" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
                            Login
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}