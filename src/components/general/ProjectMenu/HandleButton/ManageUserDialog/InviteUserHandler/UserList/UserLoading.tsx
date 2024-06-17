import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const InviteUserLoading = () => {
    return (
        <>
            <div className='w-full flex gap-2 items-center'>
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className='space-y-1 flex-auto'>
                    <Skeleton className="w-4/5 h-4" />
                    <Skeleton className='h-4 w-1/4' />
                </div>
                <Skeleton className='h-8 w-16' />
            </div>
            <div className='w-full flex gap-2 items-center'>
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className='space-y-1 flex-auto'>
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className='h-4 w-2/5' />
                </div>
                <Skeleton className='h-8 w-16' />
            </div>
            <div className='w-full flex gap-2 items-center'>
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className='space-y-1 flex-auto'>
                    <Skeleton className="w-3/5 h-4" />
                    <Skeleton className='h-4 w-1/3' />
                </div>
                <Skeleton className='h-8 w-16' />
            </div>
        </>
    )
}

export default InviteUserLoading