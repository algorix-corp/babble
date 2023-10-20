'use client'

import { Navbar, NavbarContent } from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";
import NextLink from 'next/link';
import { usePathname } from "next/navigation";

export default function ConsoleNav() {
    const pathname = usePathname();

    return (
        <Navbar isBordered>
            <NavbarContent justify="center">
                <Link href="/dashboard" color="foreground" underline={pathname.startsWith("/dashboard") ? "always" : "hover"} as={NextLink}>
                    Dashboard
                </Link>
            </NavbarContent>

            <NavbarContent justify="center">
                <Link href="/cohorts" color="foreground" underline={pathname.startsWith("/cohorts") ? "always" : "hover"} as={NextLink}>
                    Cohorts
                </Link>
            </NavbarContent>

            <NavbarContent justify="center">
                <Link href="/about-me" color="foreground" underline={pathname.startsWith("/about-me") ? "always" : "hover"} as={NextLink}>
                    About me
                </Link>
            </NavbarContent>
        </Navbar>
    )
}