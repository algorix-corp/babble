'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import { Link } from '@nextui-org/link';
import { Session } from "next-auth";

export default function LandingNav({ session }: { session: Session }) {
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
                    {session ? (
                        <>
                            <Link href={`/u/${session.user.id}`}>
                                <Button variant="solid" className="mr-3">
                                    Dashboard
                                </Button>
                            </Link>

                            <Button variant="ghost" onClick={() => signOut()}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button variant="ghost" onClick={() => signIn("google")}>
                            Login
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}