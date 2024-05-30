import CreateUserForm from '@/components/pages/CreateUser/CreateUserForm'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const CreateUserPage: NextPage = () => {
    return (
        <>
            <Head key='createUser'>
                <title>Create New User</title>
            </Head>
            <h2 className='text-2xl font-bold uppercase'>Create New User</h2>
            <span className='text-muted-foreground'>
                Fill employee information to create employee in sharing
                knowledge system.
            </span>
            <CreateUserForm />
        </>
    )
}

export default CreateUserPage
