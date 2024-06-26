import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convertAlt } from '@/lib/utils'
import { IUserInfo } from '@/types/interfaces/User'
import { Mail } from 'lucide-react'
import React from 'react'
import RemoveUserDialog from './RemoveUserDialog'

const RemoveUserItem = ({ data }: { data: IUserInfo }) => {
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
            <RemoveUserDialog user={data} />
        </div>
    )
}

export default RemoveUserItem
