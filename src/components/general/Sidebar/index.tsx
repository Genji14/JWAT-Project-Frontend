import { cn } from '@/lib/utils'
import Image from 'next/image'
import image from '@/../public/CLT.jpg'
import React, { FC, PropsWithChildren } from 'react'

type ISidebarProps = PropsWithChildren<{
    expanded?: boolean
    isBrowser?: boolean
}>

const Sidebar: FC<ISidebarProps> = ({ expanded, isBrowser }) => {
    return (
        <aside
            className={cn(
                ' transition-all ',
                expanded && 'w-80',
                isBrowser &&
                    'fixed bottom-0 left-0 z-20 hidden h-[calc(100vh-4.5rem)] overflow-hidden xl:block'
            )}
        >
            <div className='flex h-full w-full flex-col xl:p-4'>
                <div className='flex w-full items-center'>
                    <Image
                        className='h-10 w-10 object-cover'
                        src={image}
                        alt='Project Images'
                    />
                    <span
                        className={cn(
                            'ml-4 overflow-hidden font-semibold transition-all',
                            !expanded &&
                                isBrowser &&
                                'ml-0 w-0 -translate-x-5 opacity-0'
                        )}
                    >
                        CyberLogitech
                    </span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
