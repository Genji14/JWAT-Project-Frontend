import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRemoveDocument } from '@/hooks/mutation/project.mutation'
import { Document } from '@/types'
import { Loader2, Trash2 } from 'lucide-react'
import React from 'react'

const RemoveDocumentDialog = ({ document }: { document: Document }) => {
    const { mutateRemoveDocument, isPendingRemoveDocument } =
        useRemoveDocument()
    async function onSubmit(id: number) {
        try {
            await mutateRemoveDocument(id)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 className='h-4 w-4' />
            </AlertDialogTrigger>
            <AlertDialogContent styledCard className='w-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex w-full flex-col'>
                        <span>Are you absolutely sure to delete document</span>
                        <span className=''>{document.name}?</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-wrap'>
                        This action cannot be undone. This will permanently
                        delete your document
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPendingRemoveDocument}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant='destructive'
                        onClick={() => onSubmit(document.id)}
                        disabled={isPendingRemoveDocument}
                    >
                        {' '}
                        Confirm{' '}
                        {isPendingRemoveDocument && (
                            <Loader2 className='ml-3 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveDocumentDialog
