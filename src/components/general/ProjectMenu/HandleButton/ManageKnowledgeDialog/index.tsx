import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useProjectDetailContext } from '@/lib/contexts/ProjectDetailProject'
import React, { useEffect } from 'react'
import AddKnowledgeSection from './AddKnowledgeSection'
import KnowledgeList from './KnowledgeList'
import { useGetKnowledgeByProjectId } from '@/hooks/query/knowledge.query'
import { useStore } from '@/components/providers/StoreProvider'

const ManageKnowledgeDialog = () => {
    const { project } = useProjectDetailContext();
    const { knowledgeListData, isFetchingKnowledgeList } = useGetKnowledgeByProjectId();
    const isAddingMode = useStore(state => state.isAddingMode);
    const defaultAddingMode = useStore(state => state.defaultAddingMode);

    useEffect(() => {
        defaultAddingMode();
    }, [])

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='text-xl font-bold uppercase'><span className="text-primary underline underline-offset-2">{project.name}</span>'s knowledge</h3>
                <DialogDescription>
                    Add or remove knowledge tech stacks in this project.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <AddKnowledgeSection />
            {!isAddingMode && <KnowledgeList data={knowledgeListData} isFetching={isFetchingKnowledgeList} />}
        </>
    )
}

export default ManageKnowledgeDialog