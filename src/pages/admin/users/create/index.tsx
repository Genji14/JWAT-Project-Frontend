import CreateUserForm from '@/components/pages/CreateUser/CreateUserForm'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const CreateUserPage: NextPage = () => {
    return (
        <>
            <Head key='createUser'>
                <title>Create New User - Sharing Knowledge</title>
            </Head>
            <h2 className='text-center text-xl font-bold uppercase xl:text-left xl:text-2xl'>
                Create New User
            </h2>
            <span className='flex xl:text-normal justify-center text-sm text-muted-foreground xl:justify-start'>
                Fill employee information to create employee in sharing knowledge system.
            </span>
            <CreateUserForm />
        </>
    )
}

export default CreateUserPage
