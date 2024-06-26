import { useStore } from '@/components/providers/StoreProvider'
import { UserRole } from '@/types/enums'

import { Package, PieChart, UsersRoundIcon } from 'lucide-react'
import React from 'react'
import SidebarItem from '../SidebarItem'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import DocumentSidebar from '../DocumentSidebar'
const SidebarProjectList = dynamic(() => import('../ProjectList'), {
    ssr: false
})

const SidebarDynamicItems = () => {
    const role = useStore((state) => state.role);
    const { pathname } = useRouter();

    return (
        <>
            {
                role ? (role !== UserRole.ADMIN ? (
                    pathname.startsWith("/projects/") ? <>
                        <DocumentSidebar />
                    </> : <SidebarProjectList />
                ) : <>
                    <SidebarItem
                        href='/admin/dashboard'
                        label='DASHBOARD'
                        icon={<div className='p-2'><PieChart className='h-6 w-6' /></div>}
                    />
                    <SidebarItem
                        href='/admin/users'
                        label='USER MANAGEMENT'
                        icon={<div className='p-2'><UsersRoundIcon className='h-6 w-6' /></div>}
                    />
                    <SidebarItem
                        href='/admin/projects'
                        label='PROJECT MANAGEMENT'
                        icon={<div className='p-2'><Package className='h-6 w-6' /></div>}
                    />
                </>) : <></>
            }
        </>
    )
}

export default SidebarDynamicItems