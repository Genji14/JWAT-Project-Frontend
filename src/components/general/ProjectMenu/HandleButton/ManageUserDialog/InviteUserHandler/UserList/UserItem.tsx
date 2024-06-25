import { useStore } from '@/components/providers/StoreProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useInviteUser } from '@/hooks/mutation/project.mutation'
import { convertAlt } from '@/lib/utils'
import { IUserNotInProject } from '@/types/interfaces/User'
import { Mail } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const InviteUserItem = ({ data }: { data: IUserNotInProject }) => {
    const { isPendingInviteUser, mutateInviteUser } = useInviteUser()
    const defaultManageMode = useStore((state) => state.defaultManageMode)

    async function handleInviteUser(userId: number) {
        try {
            await mutateInviteUser(userId)
            defaultManageMode()
        } catch (error) {
            console.error(error)
            toast.error('Somethings went wrong, try again later.')
        }
    }

    return (
        <div className='flex w-full items-center gap-2'>
            <Avatar>
                <AvatarImage src={data.media?.url} alt={data.fullName} />
                <AvatarFallback>{convertAlt(data.fullName)}</AvatarFallback>
            </Avatar>
            <div className='flex-auto'>
                <h4 className='font-semibold'>
                    {data.fullName}{' '}
                    <span className='text-muted-foreground'>#{data.id}</span>
                </h4>
                <div className='flex items-end gap-1 text-xs text-muted-foreground'>
                    <Mail className='h-3.5 w-3.5' />
                    <span>{data.email}</span>
                </div>
            </div>
            <Button
                disabled={isPendingInviteUser}
                onClick={() => handleInviteUser(data.id)}
                className='px-3 py-1.5'
            >
                Invite
            </Button>
        </div>
    )
}

export default InviteUserItem
