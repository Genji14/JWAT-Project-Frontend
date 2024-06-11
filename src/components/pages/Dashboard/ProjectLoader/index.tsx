import { useStore } from '@/components/providers/StoreProvider'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'

const ProjectLoader = () => {
    const expanded = useStore((state) => state.expanded)

    return (
        <div
            className={cn(
                'grid grid-cols-1 gap-4 md:grid-cols-2',
                expanded ? 'lg:grid-cols-4' : 'lg:grid-cols-4'
            )}
        >
            <Skeleton className='aspect-square bg-accent' />
            <Skeleton className='aspect-square bg-accent' />
            <Skeleton className='aspect-square bg-accent' />
            <Skeleton className='aspect-square bg-accent' />

            {!expanded && <Skeleton className='aspect-square bg-accent' />}
        </div>
    )
}

export default ProjectLoader
