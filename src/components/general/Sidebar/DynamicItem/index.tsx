import { useStore } from '@/components/providers/StoreProvider'
import { UserRole } from '@/types/enums'

import { Package, PieChart, UsersRoundIcon } from 'lucide-react'
import React from 'react'
import SidebarItem from '../SidebarItem'
import dynamic from 'next/dynamic'
const SidebarProjectList = dynamic(() => import('../ProjectList'), {
    ssr: false
})

const SidebarDynamicItems = () => {
    const role = useStore((state) => state.role)

    return (
        <>
            {role ? (
                role !== UserRole.ADMIN ? (
                    <SidebarProjectList />
                ) : (
                    <>
                        <SidebarItem
                            href='/admin/dashboard'
                            label='Dashboard'
                            icon={<div className='p-2'><PieChart className='h-6 w-6' /></div>}
                        />
                        <SidebarItem
                            href='/admin/users'
                            label='User Management'
                            icon={<div className='p-2'><UsersRoundIcon className='h-6 w-6' /></div>}
                        />
                        <SidebarItem
                            href='/admin/projects'
                            label='Project Management'
                            icon={<div className='p-2'><Package className='h-6 w-6' /></div>}
                        />
                    </>
                )
            ) : (
                <></>
            )}
        </>
    )
}

export default SidebarDynamicItems