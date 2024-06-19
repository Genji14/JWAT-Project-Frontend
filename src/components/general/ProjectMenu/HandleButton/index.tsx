<<<<<<< HEAD
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import {
    AlbumIcon,
    FolderPen,
    PencilLine,
    UserRoundCogIcon,
} from 'lucide-react'
import dynamic from 'next/dynamic'
=======
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlbumIcon, FolderPen, UserRoundCogIcon } from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter as useNavigate } from 'next/navigation';
import { useRouter } from 'next/router';
>>>>>>> 1272912f89cdb59f16d06c4022d8ea4bcbf16af9

const ManageKnowledgeDialog = dynamic(() => import('./ManageKnowledgeDialog'), {
    ssr: false,
})

const ManageUserDialog = dynamic(() => import('./ManageUserDialog'), {
    ssr: false,
})

const AddBlogDialog = dynamic(() => import('./AddBlogDialog'), {
    ssr: false,
})

const HandleButton = () => {

    const router = useNavigate();
    const { query } = useRouter();

    function handleGoToEditPage() {
        router.push(`/projects/${query.id}/edit`);
    }

    return (
        <div className='flex items-center gap-1'>
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={'ghost'} className='p-2'>
                                    <PencilLine className='h-5 w-5' />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side='bottom'>
                            <p>Add New Blog</p>
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
                    <AddBlogDialog />
                </DialogContent>
            </Dialog>
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={'ghost'} className='p-2'>
                                    <UserRoundCogIcon className='h-5 w-5' />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side='bottom'>
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
<<<<<<< HEAD
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={'ghost'} className='p-2'>
                                    <FolderPen className='h-5 w-5' />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side='bottom'>
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
=======
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={handleGoToEditPage} variant={"ghost"} className="p-2">
                            <FolderPen className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Edit Project</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
>>>>>>> 1272912f89cdb59f16d06c4022d8ea4bcbf16af9
            <Dialog>
                <TooltipProvider>
                    <Tooltip>
                        <DialogTrigger asChild>
                            <TooltipTrigger asChild>
                                <Button variant={'ghost'} className='p-2'>
                                    <AlbumIcon className='h-5 w-5' />
                                </Button>
                            </TooltipTrigger>
                        </DialogTrigger>
                        <TooltipContent side='bottom' align='end'>
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

export default HandleButton
