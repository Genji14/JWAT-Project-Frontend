import { useRouter } from 'next/router';
import React from 'react'
import EmployeeBreadCrumb from './EmployeeBreadCrumb';
import dynamic from 'next/dynamic';

const AdminBreadCrumb = dynamic(() => import('./AdminBreadCrumb'), { ssr: false });

const BreadCrumbComponent = () => {
    const router = useRouter();
    const pathname = router.pathname;

    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <div className='h-full'>
            {
                isAdminRoute ? <AdminBreadCrumb /> : <EmployeeBreadCrumb />
            }
        </div>
    )
}

export default BreadCrumbComponent;
