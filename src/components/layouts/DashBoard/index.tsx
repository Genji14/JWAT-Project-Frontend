import Header from '@/components/general/Header'
import SideBar from '@/components/general/Sidebar'
import { useExpandedStore } from '@/hooks/zustand'
import { cn } from '@/lib/utils'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import React, { FC, PropsWithChildren } from 'react'

type IDashBoardLayoutProps = PropsWithChildren<{
    children: React.ReactNode
}>

const DashBoardLayout: FC<IDashBoardLayoutProps> = ({ children }) => {
    const expanded = useExpandedStore((state) => state.expanded)


    return (
        <>
            <Header />
            <div className='flex h-full w-full'>
                <SideBar expanded={expanded} isBrowser={true} />
                <main
                    className={cn(
                        'ml-0 mt-[4.5rem] flex min-h-[calc(100vh-4.5rem)] flex-auto flex-col bg-border p-2 transition-all dark:bg-border/50 sm:p-4 xl:p-6',
                        FONT_POPPINS.className,
                        expanded ? 'xl:ml-80' : 'xl:ml-header'
                    )}
                >
                    {children}
                </main>
            </div>
        </>
    )
}

export default DashBoardLayout
