import { useStore } from '@/components/providers/StoreProvider'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'
import React, { FC, PropsWithChildren } from 'react'

type ISidebarProps = PropsWithChildren<{
    isBrowser?: boolean
}>

const Sidebar: FC<ISidebarProps> = ({ isBrowser, children }) => {

    const expanded = useStore((state) => state.expanded);
    const { pathname } = useRouter();

    return (
        <aside
            className={cn(
                'transition-all',
                isBrowser &&
                'fixed bottom-0 left-0 z-20 hidden h-[calc(100vh-4.5rem)] p-2 xl:block border-border bg-background',
                expanded ? 'w-72' : "w-fit",
                pathname.startsWith("/projects") && "border-r"
            )}
        >
            <ul className='flex h-full w-full flex-col items-start gap-2'>
                {children}
            </ul>
        </aside>
    )
}

export default Sidebar;
