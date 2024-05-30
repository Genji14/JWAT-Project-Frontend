import { useExpandedStore } from '@/hooks/zustand'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import image from '@/../public/CLT.jpg'

const SideBar = () => {
    const expanded = useExpandedStore((state) => state.expanded)

    return (
        <aside
            className={cn(
                ' fixed bottom-0 left-0 z-20 h-[calc(100vh-4.5rem)]  w-fit overflow-hidden transition-all',
                expanded && 'w-96'
            )}
        >
            <div className='flex h-full w-full flex-col p-4'>
                <div className={cn(' flex items-center')}>
                    <Image
                        className='h-10 w-10 object-cover'
                        src={image}
                        alt='Project Images'
                    />
                    <span
                        className={cn(
                            'ml-4 overflow-hidden font-semibold transition-all',
                            !expanded && 'ml-0 w-0 -translate-x-5 opacity-0'
                        )}
                    >
                        CyberLogitech
                    </span>
                </div>
            </div>
        </aside>
    )
}

export default SideBar
