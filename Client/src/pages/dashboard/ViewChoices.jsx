import React from 'react'
import useFunctions from './ChoicesFunctions'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";

const ViewChoices = () => {
    const {
        getAllChoices,
        handleEdit,
        handleSave,
        handleCancel,
        deleteChoice,
        editingChoice,
        editedChoice,
        editedPrice,
        newChoice,
        newPrice,
        setEditedChoice,
        setEditedPrice,
        setNewChoice,
        setNewPrice,
        addChoice,
    } = useFunctions();


    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <Card>
                <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
                    <Typography variant="h6" color="white">
                        View Choices
                    </Typography>
                </CardHeader>
            </Card>
            <>
                {/* component */}
                <div className="flex min-h-screen items-center justify-center px-12 bg-white dark:bg-gray-950">
                    {getAllChoices(service_id).map((choice) => {
                        return (
                            <div className="max-w-md rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 " key={choice.id}>
                                <div className="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900">
                                    <div>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            {choice.choice}
                                        </p>
                                        <div className="mt-8 flex gap-4 items-center">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                                                    {choice.price}
                                                </h3>
                                                <span className="text-sm tracking-wide text-gray-600 dark:text-gray-400">
                                                    {choice.service_id}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </>


        </div>
    )
}

export default ViewChoices;