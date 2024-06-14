import { Button } from '@/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useProjectDetailContext } from '@/lib/contexts/ProjectDetailProject'
import React from 'react'
import AddKnowledgeSection from './AddKnowledgeSection'

const ManageKnowledgeDialog = () => {
    const { project } = useProjectDetailContext();

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
        </>)
}

export default ManageKnowledgeDialog