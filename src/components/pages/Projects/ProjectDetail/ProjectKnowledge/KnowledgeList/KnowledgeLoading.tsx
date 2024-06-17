import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const KnowledgeLoading = () => {
    return (
        <>
            <div className='w-full flex gap-2 items-center'>
                <Skeleton className="w-12 h-12" />
                <div className='space-y-1 flex-auto'>
                    <Skeleton className="w-4/5 h-4" />
                    <Skeleton className='h-4 w-1/4' />
                </div>
            </div>
            <div className='w-full flex gap-2 items-center'>
                <Skeleton className="w-12 h-12" />
                <div className='space-y-1 flex-auto'>
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className='h-4 w-2/5' />
                </div>
            </div>
            <div className='w-full flex gap-2 items-center'>
                <Skeleton className="w-12 h-12" />
                <div className='space-y-1 flex-auto'>
                    <Skeleton className="w-3/5 h-4" />
                    <Skeleton className='h-4 w-1/3' />
                </div>
            </div>
        </>
    )
}

export default KnowledgeLoading