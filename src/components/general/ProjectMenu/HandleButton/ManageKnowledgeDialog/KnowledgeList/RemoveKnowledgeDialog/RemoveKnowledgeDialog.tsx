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
import { useRemoveKnowledge } from '@/hooks/mutation/knowledge.mutation'
import { IKnowledge } from '@/types/interfaces/Knowledge'
import { Loader2 } from 'lucide-react'
import React from 'react'

const RemoveKnowledgeDialog = ({ knowledge }: { knowledge: IKnowledge }) => {
    const { mutateRemoveKnowledge, isPendingRemoveKnowledge } =
        useRemoveKnowledge()
    async function onSubmit(id: number) {
        try {
            await mutateRemoveKnowledge(id)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent styledCard className='w-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex w-full flex-col'>
                        <span>Are you absolutely sure to delete knowledge</span>
                        <span className=''>{knowledge.name}?</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-wrap'>
                        This action cannot be undone. This will permanently
                        delete your TechStack
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPendingRemoveKnowledge}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant='destructive'
                        onClick={() => onSubmit(knowledge.id)}
                        disabled={isPendingRemoveKnowledge}
                    >
                        {' '}
                        Confirm{' '}
                        {isPendingRemoveKnowledge && (
                            <Loader2 className='ml-3 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveKnowledgeDialog
