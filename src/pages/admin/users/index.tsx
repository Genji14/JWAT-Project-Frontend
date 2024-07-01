import HandleBar from '@/components/pages/Admin/UserManagement/HandleBar'
import UserTable from '@/components/pages/Admin/UserManagement/UserTable'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const UsersManagementPage: NextPage = () => {
    return <>
        <Head key="user-management">
            <title>User Management - Sharing Knowledge</title>
        </Head>
        <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold uppercase invisible md:visible'>User Informations</h2>
            <HandleBar />
        </div>
        <div className='my-4'>
            <UserTable />
        </div>
    </>
}

export default UsersManagementPage
