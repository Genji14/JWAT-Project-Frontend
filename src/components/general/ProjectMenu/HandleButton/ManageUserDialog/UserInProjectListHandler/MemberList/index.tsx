import { ScrollArea } from '@/components/ui/scroll-area'
import { IUserInfo } from '@/types/interfaces/User'
import React from 'react'
import InviteUserLoading from '../../InviteUserHandler/UserList/UserLoading'
import { UserRoundXIcon } from 'lucide-react'
import RemoveUserItem from './MemberItem/UserItem'
import { useCurrentUserInfo } from '@/hooks/query'

const MemberList = ({
    data,
    isFetching,
}: {
    data: IUserInfo[] | undefined
    isFetching: boolean
}) => {
    const { currentUserInfoData } = useCurrentUserInfo()
    return (
        <ScrollArea className='max-h-56'>
            <div className='flex flex-col gap-2'>
                {!isFetching ? (
                    <>
                        {data?.length ? (
                            data?.map((user) => {
                                if (user.id === currentUserInfoData?.id) return
                                else
                                    return (
                                        <RemoveUserItem
                                            key={user.id}
                                            data={user}
                                        />
                                    )
                            })
                        ) : (
                            <div className='my-3 flex  flex-col items-center justify-center text-muted-foreground'>
                                <UserRoundXIcon />
                                <span className='text-center text-sm'>
                                    No user avaiable !!
                                </span>
                            </div>
                        )}
                        {data && data?.length < 2 && (
                            <div className='my-3 flex  flex-col items-center justify-center text-muted-foreground'>
                                <UserRoundXIcon />
                                <span className='text-center text-sm'>
                                    No user avaiable !!
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <InviteUserLoading />
                )}
            </div>
        </ScrollArea>
    )
}

export default MemberList
