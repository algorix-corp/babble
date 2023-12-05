'use client'

import { Tooltip } from "@nextui-org/tooltip";
import { IconShieldCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Spacer } from '@nextui-org/spacer';
import NextLink from "next/link";
import DropdownSel from "@/app/u/[id]/DropdownSel";
import toast from 'react-hot-toast';
import { ActivityCard, CohortCard, HonorCard } from "./Cards";
import { Button } from '@nextui-org/button';
import { useState } from "react";

// TODO - use <Tabs /> when available
// TODO - maybe add settings?
export default function AccessPage({ user, me }: { user: any, me: string }) {
    let [activities, setActivities] = useState(user.activities);
    let [honors, setHonors] = useState(user.honors);
    let [cohorts, setCohorts] = useState(user.cohorts);
    let [collaborators, setCollaborators] = useState(user.invitations);

    const unfollow = () => toast.promise(new Promise((resolve, reject) => fetch("/api/invite", {
        method: "DELETE",
        body: JSON.stringify({ id: user.id })
    }).then((res) => res.status === 200 ? resolve(true) : res.json().then(reject))).then(() => window.location.reload()),
        {
            loading: "Unfollowing...",
            success: "Unfollowed!",
            error: (data) => data.error
        }
    );

    return (
        <div className="w-3/4 max-w-5xl mx-auto overflow-auto flex py-12">
            <div className="w-1/3 flex flex-col items-center">
                <Image src={user.picture} width="200" height="200" alt="Profile picture" className="rounded-full" />

                <div className="flex mt-3.5 items-center">
                    {!user.admin && <Tooltip showArrow={true} content="Admin"><IconShieldCheckFilled size={24} className="mr-2" /></Tooltip>}
                    <p className="text-xl text-center">{user.name}</p>
                </div>

                <p className="text-gray-500 mt-1">{user.email}</p>

                {user.id !== me && <>
                    <Spacer y={4} />
                    <Button color="danger" onClick={unfollow}>Unfollow</Button></>}
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

                    {user.id === me && <NavbarContent justify="end">
                        <NavbarItem>
                            <DropdownSel setActivities={setActivities} setHonors={setHonors} setCohorts={setCohorts} setCollaborators={setCollaborators} />
                        </NavbarItem>
                    </NavbarContent>}
                </Navbar>

                {activities.length > 0 && <div id="activities">
                    <Link href="#activities" color="foreground" as={NextLink} className="text-4xl font-bold">Activities</Link>

                    {activities.map((activity: any) => <ActivityCard key={activity.id} activity={activity} />)}

                    <Spacer y={8} />
                </div>}

                {honors.length > 0 && <div id="honors">
                    <Link href="#honors" color="foreground" as={NextLink} className="text-4xl font-bold">Honors</Link>

                    {honors.map((honor: any) => <HonorCard key={honor.id} honor={honor} />)}

                    <Spacer y={8} />
                </div>}

                {cohorts.length > 0 && <div id="cohorts">
                    <Link href="#cohorts" color="foreground" as={NextLink} className="text-4xl font-bold">Cohorts</Link>

                    {cohorts.map((cohort: any) => <CohortCard key={cohort.id} cohort={cohort} />)}

                    <Spacer y={8} />
                </div>}

                {collaborators.length > 0 && <div id="collaborators">
                    <Link href="#collaborators" color="foreground" as={NextLink} className="text-4xl font-bold">Collaborators</Link>

                    {collaborators.map((collaborator: any) => <Link href={`/u/${collaborator.invited.id}`} key={collaborator.id}>
                        <Image src={collaborator.invited.picture} width="50" height="50" alt="Profile picture" className="rounded-full" />
                        <p className="text-xl">{collaborator.name}</p>
                    </Link>)}
                </div>}
            </div>
        </div>
    );
}

