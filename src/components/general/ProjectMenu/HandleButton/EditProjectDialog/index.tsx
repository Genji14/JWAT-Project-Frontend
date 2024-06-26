import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { FolderPen } from 'lucide-react'
import React from 'react'
import EditProjectForm from './EditProjectForm'
import { useRouter } from 'next/router'
import { useGetProjectDetail } from '@/hooks/query/project.query'

const EditProjectDialog = () => {
    const { query } = useRouter()
    const { projectDetailData, isFetchingProjectDetail } = useGetProjectDetail(
        Number(query.id)
    )

    return (
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
                        <p>Edit project</p>
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
                <Separator />
                <DialogHeader className='space-y-0'>
                    <h3 className='text-xl font-bold uppercase'>
                        Project profile
                    </h3>
                    <DialogDescription>
                        Provide new informations to change the project
                        informations.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                {!isFetchingProjectDetail && (
                    <EditProjectForm project={projectDetailData} />
                )}
            </DialogContent>
        </Dialog>
    )
}

export default EditProjectDialog
