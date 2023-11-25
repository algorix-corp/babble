import { ModalContent } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Checkbox } from "@nextui-org/checkbox";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import Image from "next/image";

export function NewActivityModal() {
    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [participation, setParticipation] = useState(new Set([]));

    async function createActivity(cb: Function) {
        toast.promise(new Promise((resolve, reject) => fetch("/api/activity", {
            method: "POST",
            body: JSON.stringify({
                name,
                description,
                participation: Array.from(participation).sort((a, b) => isNaN(a) ? 1 : isNaN(b) ? -1 : Number(a) - Number(b)).map(v => isNaN(v) ? v : "K" + v)
            })
        }).then((res) => res.status === 400 ? res.json().then(reject) : resolve(true))).then(() => cb()),
            {
                loading: "Adding new activity...",
                success: "Activity added! Please refresh the page to see it.",
                error: (data) => data.error
            }
        );
    }

    return (
        <ModalContent>
            {(onClose) => (
                <div className="m-3.5 flex flex-col">
                    <p className="text-xl mb-3.5">Add new activity</p>

                    <Input isRequired name="name" label="Name" value={name} onValueChange={setName} />
                    <Input isRequired name="description" label="Description" value={description} onValueChange={setDescription} className="my-2" />

                    <Select isRequired name="participation" label="Grades Participated" selectionMode="multiple" selectedKeys={participation} onSelectionChange={setParticipation}>
                        <SelectItem key="9" value="9">9th</SelectItem>
                        <SelectItem key="10" value="10">10th</SelectItem>
                        <SelectItem key="11" value="11">11th</SelectItem>
                        <SelectItem key="12" value="12">12th</SelectItem>
                        <SelectItem key="POSTGRADUATE" value="POSTGRADUATE">Post-graduate</SelectItem>
                    </Select>

                    <Button onPress={() => createActivity(onClose)} className="mt-3.5 ml-auto">Submit</Button>
                </div>
            )}
        </ModalContent>
    );
}

export function NewHonorModal() {
    async function createHonor(e: any, cb: Function) {
        e.preventDefault();

        toast.promise(new Promise((resolve, reject) => fetch("/api/honor", {
            method: "POST",
            body: JSON.stringify({
                name: e.target.name.value,
                description: e.target.description.value,
                level_of_recognition: e.target.level_of_recognition.value,
                grade_received: e.target.grade_received.value,
            })
        }).then((res) => res.status === 400 ? res.json().then(reject) : resolve(true))).then(() => cb()),
            {
                loading: "Adding new honor...",
                success: "Honor added! Please refresh the page to see it.",
                error: (data) => data.error
            }
        );
    }

    return (
        <ModalContent>
            {(onClose) => (
                <form className="m-3.5 flex flex-col" onSubmit={(e) => createHonor(e, onClose)}>
                    <p className="text-xl mb-3.5">Add new honor</p>

                    <Input isRequired name="name" label="Name" className="mb-2" />
                    <Input isRequired name="description" label="Description" className="mb-2" />

                    <Select isRequired name="level_of_recognition" label="Level of Recognition" className="mb-2">
                        <SelectItem key="LOCAL" value="LOCAL">Local</SelectItem>
                        <SelectItem key="STATE" value="STATE">State</SelectItem>
                        <SelectItem key="REGIONAL" value="REGIONAL">Regional</SelectItem>
                        <SelectItem key="NATIONAL" value="NATIONAL">National</SelectItem>
                        <SelectItem key="INTERNATIONAL" value="INTERNATIONAL">International</SelectItem>
                    </Select>

                    <Select isRequired name="grade_received" label="Grade Received">
                        <SelectItem key="K9" value="K9">9th</SelectItem>
                        <SelectItem key="K10" value="K10">10th</SelectItem>
                        <SelectItem key="K11" value="K11">11th</SelectItem>
                        <SelectItem key="K12" value="K12">12th</SelectItem>
                        <SelectItem key="POSTGRADUATE" value="POSTGRADUATE">Post-graduate</SelectItem>
                    </Select>

                    <Button type="submit" className="mt-3.5 ml-auto">Submit</Button>
                </form>
            )}
        </ModalContent>
    );
}

export function NewCohortModal() {
    async function createCohort(e: any, cb: Function) {
        e.preventDefault();

        toast.promise(new Promise((resolve, reject) => fetch("/api/cohort", {
            method: "POST",
            body: JSON.stringify({
                name: e.target.name.value,
                private: e.target.private.checked
            })
        }).then((res) => res.status === 400 ? res.json().then(reject) : resolve(true))).then(() => cb()),
            {
                loading: "Adding new cohort...",
                success: "Cohort added! Please refresh the page to see it.",
                error: (data) => data.error
            }
        );
    }

    return (
        <ModalContent>
            {(onClose) => (
                <form className="m-3.5 flex flex-col" onSubmit={(e) => createCohort(e, onClose)}>
                    <p className="text-xl mb-3.5">Add new cohort</p>

                    <Input isRequired name="name" label="Name" className="mb-2" />
                    <Checkbox name="private">Hide from collaborators</Checkbox>

                    <Button type="submit" className="mt-3.5 ml-auto">Submit</Button>
                </form>
            )}
        </ModalContent>
    );
}

// TODO - add suspense for loading invitations
export function ViewInvitationsModal() {
    let [invitations, setInvitations] = useState([]);

    useEffect(() => { getInvitations() }, [])

    async function getInvitations() {
        let data = await fetch("/api/invitations").then(res => res.json());
        setInvitations(data);
    }

    return (
        <ModalContent>
            <div className="m-3.5 flex flex-col" >
                <p className="text-xl">Users that Invited me for Collaboration</p>

                <Listbox>
                    {invitations.map((invitation) => (
                        <ListboxItem key={invitation.id} className="flex items-center">
                            <Image src={invitation.user.picture} alt="Profile picture" className="rounded-full mr-2" width="40" height="40" />

                            <div className="flex flex-col">
                                <p className="text-lg">{invitation.name}</p>
                                <p className="text-gray-500">{invitation.email}</p>
                            </div>
                        </ListboxItem>
                    ))}
                </Listbox>
            </div>
        </ModalContent>
    );
}

export function NewCollaboratorModal() {
    async function inviteCollaborator(e: any, cb: Function) {
        e.preventDefault();

        toast.promise(new Promise((resolve, reject) => fetch("/api/invite", {
            method: "POST",
            body: JSON.stringify({
                email: e.target.email.value
            })
        }).then((res) => res.status === 400 ? res.json().then(reject) : resolve(true))).then(() => cb()),
            {
                loading: "Inviting new collaborator...",
                success: "Collaborator invited! Please refresh the page to see it.",
                error: (data) => data.error
            }
        );
    }

    return (
        <ModalContent>
            {(onClose) => (
                <form className="m-3.5 flex flex-col" onSubmit={(e) => inviteCollaborator(e, onClose)}>
                    <p className="text-xl">Invite new collaborator</p>
                    <p className="text-danger mb-3.5">Attention: Collaborators will have access to every viewable activity, honor, and cohort that you own.</p>

                    <Input isRequired name="email" label="Email" />

                    <Button type="submit" className="mt-3.5 ml-auto">Submit</Button>
                </form>
            )}
        </ModalContent>
    );
}