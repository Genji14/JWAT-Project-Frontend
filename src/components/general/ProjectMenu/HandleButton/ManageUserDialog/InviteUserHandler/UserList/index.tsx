import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { IUserNotInProject } from '@/types/interfaces/User';
import InviteUserLoading from './UserLoading';
import InviteUserItem from './UserItem';
import { UserRoundXIcon } from 'lucide-react';

const InviteUserList = ({ data, isFetching }: { data: IUserNotInProject[] | undefined, isFetching: boolean }) => {

    return (
        <ScrollArea className='max-h-56'>
            <div className='flex flex-col gap-2'>
                {
                    !isFetching ? <>
                        {
                            !!data?.length ? data?.map((user) => {
                                return <InviteUserItem key={user.id} data={user} />
                            }) :
                                <div className="my-3 text-muted-foreground  flex flex-col items-center justify-center">
                                    <UserRoundXIcon />
                                    <span className='text-sm text-center'>No user avaiable !!</span>
                                </div>
                        }
                    </> : <InviteUserLoading />
                }
            </div>
        </ScrollArea>
    )
}

export default InviteUserList;