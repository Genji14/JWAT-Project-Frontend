import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { IPaginationUserInfor } from '@/types/interfaces/User'
import InviteUserLoading from './UserLoading'
import InviteUserItem from './UserItem'
import { UserRoundXIcon } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

const InviteUserList = ({
    data,
    isFetching,
}: {
    data: IPaginationUserInfor | undefined
    isFetching: boolean
}) => {
    return (
        <ScrollArea className='max-h-56'>
            <div className='flex flex-col gap-2'>
                {!isFetching ? (
                    <>
                        {data?.items.length ? (
                            data?.items.map((user) => {
                                return (
                                    <InviteUserItem key={user.id} data={user} />
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
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href='#' />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href='#' />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </>
                ) : (
                    <InviteUserLoading />
                )}
            </div>
        </ScrollArea>
    )
}

export default InviteUserList
