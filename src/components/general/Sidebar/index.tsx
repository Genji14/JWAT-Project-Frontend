import { useStore } from '@/components/providers/StoreProvider'
import { cn } from '@/lib/utils'
import React, { FC, PropsWithChildren } from 'react'

type ISidebarProps = PropsWithChildren<{
    isBrowser?: boolean
}>

const Sidebar: FC<ISidebarProps> = ({ isBrowser, children }) => {
    const expanded = useStore((state) => state.expanded);

    return (
        <aside
            className={cn(
                'transition-all',
                isBrowser &&
                'fixed bottom-0 left-0 z-20 hidden h-[calc(100vh-4.5rem)] p-2 xl:block',
                expanded ? 'w-72' : "w-fit"
            )}
        >
            <ul className='flex h-full w-full flex-col items-start gap-2'>
                {children}
            </ul>
        </aside>
    )
}

export default Sidebar;
