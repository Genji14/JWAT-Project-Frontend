import React from 'react'
import ProfileMenu from './ProfileMenu'
import { ModeToggle } from './ThemeToggle'
import SidebarButton from './SidebarButton'

const Header: React.FC = () => {
    return (
        <header className='z-50 fixed top-0 left-0 w-full h-18 flex items-center bg-background backdrop-blur-xl border-b dark:border-border shadow'>
            <nav className="w-full h-full flex items-center justify-between pr-4 sm:pr-6 lg:pr-8 relative">
                <SidebarButton />
                <div className="flex items-center gap-2 py-2">
                    <ModeToggle />
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    )
}

export default Header
