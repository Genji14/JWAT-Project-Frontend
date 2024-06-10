import React, { useEffect } from 'react'
import { ModeToggle } from './ThemeToggle'
import SidebarButton from './SidebarButton'
import BreadCrumbComponent from '../BreadCrumb'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const ProfileMenu = dynamic(() => import("./ProfileMenu"), {
    loading: () => <Skeleton className="w-12 h-12 rounded-full" />,
    ssr: false,
})

const Header: React.FC = () => {

    return (
        <header className='fixed left-0 top-0 z-50 flex h-[4.5rem] w-full items-center border-b bg-background shadow backdrop-blur-xl dark:border-border'>
            <nav className='relative flex h-full w-full items-center justify-between pr-4 sm:pr-6 lg:pr-8'>
                <div className='flex items-center gap-2'>
                    <SidebarButton />
                    <BreadCrumbComponent />
                </div>
                <div className='flex items-center gap-2 py-2'>
                    <ModeToggle />
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    )
}

export default Header;
