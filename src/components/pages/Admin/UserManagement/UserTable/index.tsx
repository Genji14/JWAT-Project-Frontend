import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import React, { useState } from 'react'
import { useGetUserManagementData } from '@/hooks/query/user.query'
import { IUserInfo } from '@/types/interfaces/User'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn, convertAlt } from '@/lib/utils'
import { UserRole } from '@/types/enums'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const UserTable = () => {

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(6);

    const { isFetching, usersPaginationData } = useGetUserManagementData({
        page: page,
        limit: limit
    });


    const renderPageNumbers = () => {
        const totalPages = usersPaginationData?.meta.totalPages || 1;
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PaginationItem key={i}>
                    <PaginationLink isActive={page === i} onClick={() => setPage(i)}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return pageNumbers;
    }


    return (
        <>
            <div className='flex flex-col gap-4'>
                {isFetching ? <Skeleton className='bg-background dark:bg-border w-full aspect-[25/9]' />
                    : <Table className='bg-background rounded-lg overflow-hidden shadow-md'>
                        <TableHeader>
                            <TableRow className='bg-primary/80 hover:bg-primary/90'>
                                <TableHead className="w-28 text-background">User ID</TableHead>
                                <TableHead className='w-80 text-background'>Information</TableHead>
                                <TableHead className='w-48 text-background'>Email</TableHead>
                                <TableHead className='w-48 text-background'>Phone Number</TableHead>
                                <TableHead className='text-background'>Username</TableHead>
                                <TableHead className='text-background'>Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                usersPaginationData?.items.map((item: IUserInfo) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-semibold">#{item.id}</TableCell>
                                            <TableCell>
                                                <div className='flex items-center gap-3'>
                                                    <Avatar>
                                                        <AvatarImage src={item.media?.url} />
                                                        <AvatarFallback>{convertAlt(item.fullName)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex flex-col gap-1'>
                                                        <span className='text-muted-foreground font-semibold'>{item.fullName}</span>
                                                        <div
                                                            className={cn('border h-fit px-2 rounded w-fit',
                                                                item.role !== UserRole.EMPLOYEE ? (item.role === UserRole.ADMIN ? "border-yellow-500 text-yellow-500  bg-yellow-500/20" : "border-primary text-primary bg-primary/20") : "border-muted-foreground text-muted-foreground  bg-muted-foreground/20")}
                                                        >
                                                            <span className='text-xs font-semibold'>{item.role}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.phoneNumber}</TableCell>
                                            <TableCell className='font-semibold'>{item.username}</TableCell>
                                            <TableCell>{item.address}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }

                        </TableBody>
                    </Table>
                }

                <div className='flex justify-center item-center gap-4'>
                    <Pagination className='w-fit'>
                        <PaginationContent className='w-fit'>
                            <PaginationItem>
                                {
                                    page > 1 && <PaginationPrevious onClick={() => setPage(prev => prev - 1)} />
                                }
                            </PaginationItem>
                            {renderPageNumbers()}
                            <PaginationItem>
                                {
                                    usersPaginationData?.meta.totalPages && page < usersPaginationData?.meta.totalPages && <PaginationNext onClick={() => setPage(prev => prev + 1)} />
                                }
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <div className="flex items-center gap-2">
                        <span className='text-sm'>Show rows</span>
                        <Select value={limit.toString()} onValueChange={(value) => {
                            setLimit(Number(value));
                            setPage(1)
                        }}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent align='end'>
                                {
                                    [2, 4, 6, 8, 10, 12].map((item, index) => {
                                        return <SelectItem value={item.toString()} key={index}>{item}</SelectItem>
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserTable