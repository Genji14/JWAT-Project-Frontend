import React from 'react'
import ProfileMenu from './ProfileMenu'
import { ModeToggle } from './ThemeToggle'
import SidebarButton from './SidebarButton'

const Header: React.FC = () => {
    return (
        <header className='h-18 fixed left-0 top-0 z-50 flex w-full items-center border-b bg-background shadow backdrop-blur-xl dark:border-border'>
            <nav className='relative flex h-full w-full items-center justify-between pr-4 sm:pr-6 lg:pr-8'>
                <SidebarButton />
                <div className='flex items-center gap-2 py-2'>
                    <ModeToggle />
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    )
}

export default Header
