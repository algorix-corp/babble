import prisma from "@/lib/prisma";
import { Tooltip } from "@nextui-org/tooltip";
import { IconShieldCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Spacer } from '@nextui-org/spacer';
import NextLink from "next/link";
import DropdownSel from "@/app/u/[id]/DropdownSel";

// TODO - use <Tabs /> when available
// TODO - maybe add settings?
export default async function AccessPage({ id, self }: { id: string, self: boolean }) {
    let user = await prisma.user.findUnique({ where: { id }, include: { activities: true, cohorts: true, honors: true, invitations: true } });
    let { activities, cohorts, honors, invitations: collaborators } = user;

    return (
        <div className="w-3/4 max-w-5xl mx-auto overflow-auto flex py-12">
            <div className="w-1/3 flex flex-col items-center">
                <Image src={user.picture} width="200" height="200" alt="Profile picture" className="rounded-full" />

                <div className="flex mt-3.5 items-center">
                    {!user.admin && <Tooltip showArrow={true} content="Admin"><IconShieldCheckFilled size={24} className="mr-2" /></Tooltip>}
                    <p className="text-xl text-center">{user.name}</p>
                </div>

                <p className="text-gray-500 mt-1">{user.email}</p>
            </div>

            <div className="w-2/3">
                <Navbar>
                    <NavbarContent justify="start">
                        <NavbarItem>
                            <Link href="#activities" color="foreground" underline="always" as={NextLink} isDisabled={activities.length === 0}>Activities</Link>
                        </NavbarItem>

                        <NavbarItem>
                            <Link href="#honors" color="foreground" underline="always" as={NextLink} isDisabled={honors.length === 0}>Honors</Link>
                        </NavbarItem>

                        <NavbarItem>
                            <Link href="#cohorts" color="foreground" underline="always" as={NextLink} isDisabled={cohorts.length === 0}>Cohorts</Link>
                        </NavbarItem>

                        <NavbarItem>
                            <Link href="#collaborators" color="foreground" underline="always" as={NextLink} isDisabled={collaborators.length === 0}>Collaborators</Link>
                        </NavbarItem>
                    </NavbarContent>

                    {self && <NavbarContent justify="end">
                        <NavbarItem>
                            <DropdownSel />
                        </NavbarItem>
                    </NavbarContent>}
                </Navbar>

                {activities.length > 0 && <div id="activities">
                    <Link href="#activities" color="foreground" as={NextLink} className="text-4xl font-bold cursor-pointer">Activities</Link>

                    <Spacer y={8} />
                </div>}

                {honors.length > 0 && <div id="honors">
                    <Link href="#honors" color="foreground" as={NextLink} className="text-4xl font-bold cursor-pointer">Honors</Link>

                    <Spacer y={8} />
                </div>}

                {cohorts.length > 0 && <div id="cohorts">
                    <Link href="#cohorts" color="foreground" as={NextLink} className="text-4xl font-bold cursor-pointer">Cohorts</Link>

                    <Spacer y={8} />
                </div>}

                {collaborators.length > 0 && <div id="collaborators">
                    <Link href="#collaborators" color="foreground" as={NextLink} className="text-4xl font-bold cursor-pointer">Collaborators</Link>
                </div>}

                {activities.length === 0 && honors.length === 0 && cohorts.length === 0 && collaborators.length === 0 && <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold mt-6">Let the journey begin!</p>
                    <p className="text-xl text-center">This user has no activities, honors, cohorts, or collaborators.</p>
                </div>}
            </div>
        </div >
    );
}

