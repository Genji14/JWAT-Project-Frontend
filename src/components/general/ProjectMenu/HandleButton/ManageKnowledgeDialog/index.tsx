import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useProjectDetailContext } from '@/lib/contexts/ProjectDetailProject'
import React, { useEffect } from 'react'
import AddKnowledgeSection from './AddKnowledgeSection'
import KnowledgeList from './KnowledgeList'
import { useGetKnowledgeByProjectId } from '@/hooks/query/knowledge.query'
import { useStore } from '@/components/providers/StoreProvider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { AlbumIcon } from 'lucide-react'

const ManageKnowledgeDialog = () => {
    const { project } = useProjectDetailContext()
    const { knowledgeListData, isFetchingKnowledgeList } =
        useGetKnowledgeByProjectId()
    const isAddingMode = useStore((state) => state.isAddingMode)
    const defaultAddingMode = useStore((state) => state.defaultAddingMode)

    useEffect(() => {
        defaultAddingMode();
    }, [])

    return (
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
                <DialogHeader className='space-y-0'>
                    <h3 className='text-xl font-bold uppercase'>
                        <span className='text-primary underline underline-offset-2'>
                            {project.name}
                        </span>
                        <span>
                            {' '}
                        </span>
                        &lsquo;s knowledge
                    </h3>
                    <DialogDescription>
                        Add or remove knowledge tech stacks in this project.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <AddKnowledgeSection />
                {!isAddingMode && (
                    <KnowledgeList
                        data={knowledgeListData}
                        isFetching={isFetchingKnowledgeList}
                    />
                )}
            </DialogContent>
        </Dialog>

    )
}

export default ManageKnowledgeDialog
