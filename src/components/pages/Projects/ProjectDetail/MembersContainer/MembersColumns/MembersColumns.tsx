import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { convertAlt } from '@/lib/utils'
import { Media } from '@/types'
import { IUserInfo } from '@/types/interfaces/User'
import { ColumnDef } from '@tanstack/react-table'
import {
    ArrowUpDown,
    CircleUser,
    Crown,
    TrainFront,
    TrainFrontTunnel,
} from 'lucide-react'
import React from 'react'

const columns: ColumnDef<IUserInfo>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className='p-2'
                >
                    Employee Number
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const member = row.original
            return (
                <div className='flex w-28 items-center justify-between'>
                    <div>{member.id}</div>
                    <Avatar>
                        <AvatarImage src={member.media?.url} />
                        <AvatarFallback>
                            {convertAlt(member.fullName)}
                        </AvatarFallback>
                    </Avatar>
                </div>
            )
        },
    },
    {
        accessorKey: 'fullName',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className='p-2'
                >
                    Full Name
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const fullName: string = row.getValue('fullName')
            return <div className='ps-2'>{fullName}</div>
        },
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className='p-2'
                >
                    Gender
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const gender: string = row.getValue('gender')
            return (
                <div className='ps-2'>
                    {gender === 'MALE' ? (
                        <TrainFront color='blue' />
                    ) : (
                        <TrainFrontTunnel color='red' />
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: 'phoneNumber',
        header: ({ column }) => {
            return <div className='ps-2'>Phone Number</div>
        },
        cell: ({ row }) => {
            const phone: string = row.getValue('phoneNumber')
            return <div className='ps-2'>{phone}</div>
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return <div className='ps-2'>Email</div>
        },
        cell: ({ row }) => {
            const email: string = row.getValue('email')
            return <div className='ps-2'>{email}</div>
        },
    },
    {
        accessorKey: 'role',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                    className='p-2'
                >
                    Role
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const role: string = row.getValue('role')
            return (
                <div className='ps-2'>
                    {role === 'MANAGER' ? (
                        <Crown className='text-[#e0e000]' />
                    ) : (
                        <CircleUser color='green' />
                    )}
                </div>
            )
        },
    },
]

export default columns
