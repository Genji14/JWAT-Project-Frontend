import Header from '@/components/general/Header'
import SideBar from '@/components/general/Sidebar'
import { cn } from '@/lib/utils'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import React, { FC, PropsWithChildren } from 'react'
import { useStore } from '../providers/StoreProvider'
import { UserRole } from '@/types/enums'
import SideBarProjectList from '../general/Sidebar/ProjectList'

type IDashBoardLayoutProps = PropsWithChildren<{
    children: React.ReactNode
}>

const DashBoardLayout: FC<IDashBoardLayoutProps> = ({ children }) => {
    const expanded = useStore((state) => state.expanded)
    const role = useStore((state) => state.role)

    return (
        <>
            <Header />
            <div className='flex h-full w-full'>
                <SideBar isBrowser={true}>
                    {role !== UserRole.ADMIN ? (
                        <SideBarProjectList expanded={expanded} />
                    ) : (
                        <></>
                    )}
                </SideBar>
                <main
                    className={cn(
                        'ml-0 flex min-h-screen flex-auto flex-col bg-border p-2 transition-all dark:bg-border/50 sm:p-4 xl:p-6',
                        FONT_POPPINS.className,
                        expanded ? 'xl:ml-[292px]' : 'xl:ml-header'
                    )}
                >
                    <section className='mt-[4.5rem]'>{children}</section>
                </main>
            </div>
        </>
    )
}

export default DashBoardLayout
