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
import { useRouter } from 'next/router'

import { useRouter as useNavigate } from 'next/navigation'
import { Can, useAbility } from '@/components/providers/AbilityProvider'

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

    const ability = useAbility();

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
            <Can I="invite" a="User" ability={ability}>
                <ManageUserDialog />
            </Can>

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
