import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import DocumentForm from './DocumentForm'

const AddDocumentDialog = () => {
    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='text-lg font-bold uppercase'>
                    New Document
                </h3>
                <DialogDescription>
                    Upload for all members can read new document.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <DocumentForm />
        </>
    )
}

export default AddDocumentDialog