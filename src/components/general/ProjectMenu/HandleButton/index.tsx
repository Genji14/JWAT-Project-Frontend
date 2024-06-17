import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlbumIcon, FolderPen, UserRoundCogIcon } from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';

const ManageKnowledgeDialog = dynamic(() => import("./ManageKnowledgeDialog"), {
    ssr: false
})

const ManageUserDialog = dynamic(() => import("./ManageUserDialog"), {
    ssr: false
});

const HandleButton = () => {
    return (
        <div className="flex items-center gap-1">
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="p-2">
                                    <UserRoundCogIcon className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side="bottom">
                            <p>Manage Member</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent
                    styledCard={true}
                    className='p-6 lg:w-2/5'
                    onInteractOutside={(e) => {
                        e.preventDefault()
                    }}
                >
                    <ManageUserDialog />
                </DialogContent>
            </Dialog>
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="p-2">
                                    <FolderPen className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side="bottom">
                            <p>Edit Project</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent
                    styledCard={true}
                    className='p-6 lg:w-2/5'
                    onInteractOutside={(e) => {
                        e.preventDefault()
                    }}
                >
                </DialogContent>
            </Dialog>
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={"ghost"} className="p-2">
                                    <AlbumIcon className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side="bottom" align='end'>
                            <p>Manage Knowledge</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent
                    styledCard={true}
                    className='p-6 lg:w-2/5'
                    onInteractOutside={(e) => {
                        e.preventDefault()
                    }}
                >
                    <ManageKnowledgeDialog />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default HandleButton;