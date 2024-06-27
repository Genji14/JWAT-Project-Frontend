import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useState } from 'react'
import { IPaginationUserInfor } from '@/types/interfaces/User'
import InviteUserLoading from './UserLoading'
import InviteUserItem from './UserItem'
import { UserRoundXIcon } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'

const InviteUserList = ({
    data,
    isFetching,
    setPage,
}: {
    data: IPaginationUserInfor | undefined
    isFetching: boolean
    setPage: React.Dispatch<React.SetStateAction<number>>
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
                                    <Button
                                        variant={'outline'}
                                        disabled={data?.meta.currentPage! <= 1}
                                        onClick={() =>
                                            setPage((prev) => prev - 1)
                                        }
                                    >
                                        &lt; Previous
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button
                                        variant={'outline'}
                                        disabled={
                                            data?.meta.currentPage! >=
                                            data?.meta.totalPages!
                                        }
                                        onClick={() =>
                                            setPage((prev) => prev + 1)
                                        }
                                    >
                                        Next &gt;
                                    </Button>
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
