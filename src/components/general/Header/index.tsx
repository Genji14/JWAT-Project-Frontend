import React from 'react'
import SidebarButton from './SidebarButton'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'
import Logo from './Logo'
import Link from 'next/link'
import { useStore } from '@/components/providers/StoreProvider'
import { UserRole } from '@/types/enums'

const ProfileMenu = dynamic(() => import('./ProfileMenu'), {
    loading: () => <Skeleton className='h-12 w-12 rounded-full' />,
    ssr: false,
})

const ModeToggle = dynamic(() => import('./ModeToggle'), {
    loading: () => <Skeleton className='h-8 w-8' />,
    ssr: false,
})

const Header: React.FC = () => {
    const role = useStore((state) => state.role)

    return (
        <header className='fixed left-0 top-0 z-50 flex h-[4.5rem] w-full items-center border-b bg-background shadow backdrop-blur-xl dark:border-border'>
            <nav className='relative flex h-full w-full items-center justify-between pr-4 sm:pr-6 lg:pr-8'>
                <div className='flex items-center gap-2'>
                    <SidebarButton />
                    <Link
                        href={
                            role === UserRole.ADMIN ? '/admin/dashboard' : '/'
                        }
                    >
                        <Logo />
                    </Link>
                </div>
                <div className='flex items-center gap-2 py-2'>
                    <ModeToggle />
                    <ProfileMenu />
                </div>
            </nav>
        </header>
    )
}

export default Header
