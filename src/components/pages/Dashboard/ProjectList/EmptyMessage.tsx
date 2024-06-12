import { PackageX } from 'lucide-react'
import React from 'react'

const EmptyMessage = () => {
    return (
        <div className='flex flex-col gap-1 items-center bg-background w-full shadow-md p-6 text-destructive rounded'>
            <PackageX className='w-8 h-8' />
            <h1 className='font-semibold'>No projects avaible</h1>
        </div>
    )
}

export default EmptyMessage
