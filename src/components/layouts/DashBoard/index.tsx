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
                <SideBar />
                <main
                    className={cn(
                        'mt-[4.5rem] flex min-h-[calc(100vh-4.5rem)] flex-auto flex-col bg-border p-8 transition-all dark:bg-border/50',
                        FONT_POPPINS.className,
                        expanded ? 'ml-96' : 'ml-header'
                    )}
                >
                    {children}
                </main>
            </div>
        </>
    )
}

export default DashBoardLayout
