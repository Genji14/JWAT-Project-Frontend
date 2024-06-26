import { useStore } from '@/components/providers/StoreProvider'
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
import { useRemoveUser } from '@/hooks/mutation/project.mutation'
import { IUserInfo } from '@/types/interfaces/User'
import { Loader2 } from 'lucide-react'
import React from 'react'

const RemoveUserDialog = ({ user }: { user: IUserInfo }) => {
    const { mutateRemoveUser, isPendingRemoveUser } = useRemoveUser()
    const defaultAddingMode = useStore((state) => state.defaultAddingMode)

    async function onSubmit(id: number) {
        try {
            await mutateRemoveUser(id)
            defaultAddingMode()
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>Remove</Button>
            </AlertDialogTrigger>
            <AlertDialogContent styledCard className='w-fit'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex w-full flex-col'>
                        <span>Are you absolutely sure to remove user </span>
                        <span className=''>
                            {user.fullName} from this project?
                        </span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-wrap'>
                        This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPendingRemoveUser}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant='destructive'
                        onClick={() => onSubmit(user.id)}
                        disabled={isPendingRemoveUser}
                    >
                        {' '}
                        Confirm{' '}
                        {isPendingRemoveUser && (
                            <Loader2 className='ml-3 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default RemoveUserDialog
