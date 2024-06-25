import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { AlbumIcon, FolderPen, PencilLine } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Can, useAbility } from '@/components/providers/AbilityProvider'
import { useGetProjectDetail } from '@/hooks/query/project.query'

const ManageKnowledgeDialog = dynamic(() => import('./ManageKnowledgeDialog'), {
    ssr: false,
})

const ManageUserDialog = dynamic(() => import('./ManageUserDialog'), {
    ssr: false,
})

const AddBlogDialog = dynamic(() => import('./AddBlogDialog'), {
    ssr: false,
})

const EditProjectDialog = dynamic(() => import('./EditProjectDialog'), {
    ssr: false,
})

const HandleButton = () => {
    const ability = useAbility()
    const { query } = useRouter()
    const { projectDetailData, isFetchingProjectDetail } = useGetProjectDetail(
        Number(query.id)
    )

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
            <Can I='invite' a='User' ability={ability}>
                <ManageUserDialog />
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
                        {!isFetchingProjectDetail && (
                            <EditProjectDialog project={projectDetailData} />
                        )}
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <ManageKnowledgeDialog />
                </Dialog>
            </Can>
        </div>
    )
}

export default HandleButton
