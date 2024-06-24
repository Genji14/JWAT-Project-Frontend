import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import EditDocumentsForm from './EditDocumentsForm'

const EditDocumentsDialog = () => {
    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='text-lg font-bold uppercase'>
                    Edit the Document Group hierachy
                </h3>
                <DialogDescription>
                    You can delete documents or ungroup a group of documents.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <EditDocumentsForm />
        </>
    )
}

export default EditDocumentsDialog
