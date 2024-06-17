import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useProjectDetailContext } from '@/lib/contexts/ProjectDetailProject'
import React from 'react'
import AddKnowledgeSection from './AddKnowledgeSection'
import KnowledgeList from './KnowledgeList'
import { useGetKnowledgeByProjectId } from '@/hooks/query/knowledge.query'

const ManageKnowledgeDialog = () => {
    const { project } = useProjectDetailContext();
    const { knowledgeListData, isFetchingKnowledgeList } = useGetKnowledgeByProjectId();

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
            <KnowledgeList data={knowledgeListData} isFetching={isFetchingKnowledgeList} />
        </>)
}

export default ManageKnowledgeDialog