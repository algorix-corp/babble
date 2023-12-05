import { Button } from '@nextui-org/button';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Modal, useDisclosure } from '@nextui-org/react';
import { NewActivityModal, NewCohortModal, NewCollaboratorModal, NewHonorModal, ViewInvitationsModal } from './MenuModals';

export default function DropdownSel({ setActivities, setHonors, setCohorts, setCollaborators }: { setActivities: Function, setHonors: Function, setCohorts: Function, setCollaborators: Function }) {
    let { isOpen: isActivityOpen, onOpen: onActivityOpen, onOpenChange: onActivityOpenChange } = useDisclosure();
    let { isOpen: isHonorOpen, onOpen: onHonorOpen, onOpenChange: onHonorOpenChange } = useDisclosure();
    let { isOpen: isCohortOpen, onOpen: onCohortOpen, onOpenChange: onCohortOpenChange } = useDisclosure();
    let { isOpen: isInvitationsOpen, onOpen: onInvitationsOpen, onOpenChange: onInvitationsOpenChange } = useDisclosure();
    let { isOpen: isCollaboratorOpen, onOpen: onCollaboratorOpen, onOpenChange: onCollaboratorOpenChange } = useDisclosure();

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="bordered">Open Menu</Button>
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownItem key="new_activity" onPress={onActivityOpen}>Add New Activity</DropdownItem>
                    <DropdownItem key="new_honor" onPress={onHonorOpen}>Add New Honor</DropdownItem>
                    <DropdownItem key="new_cohort" onPress={onCohortOpen}>Add New Cohort</DropdownItem>
                    <DropdownItem key="view_invitations" onPress={onInvitationsOpen}>View Invitations</DropdownItem>
                    <DropdownItem key="new_collaborator" className='text-danger' color='danger' onPress={onCollaboratorOpen}>Invite New Collaborator</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Modal isOpen={isActivityOpen} onOpenChange={onActivityOpenChange}><NewActivityModal setActivities={setActivities} /></Modal>
            <Modal isOpen={isHonorOpen} onOpenChange={onHonorOpenChange}><NewHonorModal setHonors={setHonors} /></Modal>
            <Modal isOpen={isCohortOpen} onOpenChange={onCohortOpenChange}><NewCohortModal setCohorts={setCohorts} /></Modal>
            <Modal isOpen={isInvitationsOpen} onOpenChange={onInvitationsOpenChange}><ViewInvitationsModal /></Modal>
            <Modal isOpen={isCollaboratorOpen} onOpenChange={onCollaboratorOpenChange}><NewCollaboratorModal setCollaborators={setCollaborators} /></Modal>
        </>
    )
}