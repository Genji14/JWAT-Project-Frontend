import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BookPlusIcon, FolderPen, UserRoundCogIcon } from 'lucide-react';
import React from 'react'

const HandleButton = () => {
    return (
        <div className="flex items-center gap-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"ghost"} className="w-fit h-fit p-2">
                        <UserRoundCogIcon className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>Manage User</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"ghost"} className="w-fit h-fit p-2">
                        <FolderPen className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>Edit Project</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={"ghost"} className="w-fit h-fit p-2">
                        <BookPlusIcon className="w-5 h-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align='end'>
                    <p>Manage Knowledge</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default HandleButton;