import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { IconEdit } from "@tabler/icons-react";
import Link from "next/link";

export function ActivityCard({ activity }: { activity: any }) {
    return (
        <div className="border-2 mx-2 my-5 rounded-xl p-5 relative">
            <div className="flex items-end mr-8">
                <p className="text-2xl font-bold truncate mr-1">{activity.name}</p>
                <p className="text-sm text-gray-500 whitespace-nowrap">{activity.participation.map(v => v.startsWith("K") ? v.substring(1) : "Post-graduate").join(", ")}</p>
            </div>

            <p className="text-xl break-words">{activity.description}</p>

            <Tooltip showArrow={true} content="Edit">
                <Button size="sm" variant="bordered" isIconOnly className="ml-2 absolute right-3 top-3">
                    <IconEdit size={18} />
                </Button>
            </Tooltip>
        </div>
    );
}

export function HonorCard({ honor }: { honor: any }) {
    return (
        <div className="border-2 mx-2 my-5 rounded-xl p-5 relative">
            <div className="flex items-end mr-8">
                <p className="text-2xl font-bold truncate mr-1">{honor.name}</p>
                <p className="text-sm text-gray-500 whitespace-nowrap">{honor.grade_received.startsWith("K") ? honor.grade_received.substring(1) : "Post-graduate"} / {honor.level_of_recognition}</p>
            </div>

            <p className="text-xl break-words">{honor.description}</p>

            <Tooltip showArrow={true} content="Edit">
                <Button size="sm" variant="bordered" isIconOnly className="ml-2 absolute right-3 top-3">
                    <IconEdit size={18} />
                </Button>
            </Tooltip>
        </div>
    );
}

export function CohortCard({ cohort }: { cohort: any }) {
    return (
        <Link href={`/c/${cohort.id}`}>
            <div className={`border-2 mx-2 my-5 rounded-xl p-5 relative ${cohort.private ? "border-dashed" : "border-solid"}`}>
                <div className="flex items-end mr-8">
                    <p className="text-2xl font-bold truncate mr-1">{cohort.name}</p>
                    <p className="text-sm text-gray-500 whitespace-nowrap">{cohort.private ? "PRIVATE" : null}</p>
                </div>

                <p className="text-xl break-words">Early Deadline: {cohort.early_deadline ?? "N/A"}</p>
                <p className="text-xl break-words">Final Deadline: {cohort.final_deadline ?? "N/A"}</p>

                <Tooltip showArrow={true} content="Edit">
                    <Button size="sm" variant="bordered" isIconOnly className="ml-2 absolute right-3 top-3">
                        <IconEdit size={18} />
                    </Button>
                </Tooltip>
            </div>
        </Link>
    );
}