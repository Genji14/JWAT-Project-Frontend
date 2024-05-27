import React from 'react'
import ProfileMenu from './ProfileMenu'
import { ModeToggle } from './ThemeToggle'
import Sidebar from './SideBar'

const Header: React.FC = () => {
    return (
        <header className='z-50 fixed top-0 left-0 w-full flex items-center bg-background-1 backdrop-blur-xl border-b border-border-1 py-2 shadow'>
            <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 relative">
                <Sidebar />
                <div className="flex items-center gap-2">
                    <ModeToggle />
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    )
}

export default Header
