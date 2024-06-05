import { cn } from '@/lib/utils'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import { NextPage } from 'next'
import React from 'react'
import StyledCard from '@/components/shared/StyledCard'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'

const SignInForm = dynamic(
    () => import('@/components/pages/SignIn/SignInForm'),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)

const SignInPage = () => {
    return (
        <>
            <Head key='sign-in'>
                <title>Sign In - Sharing Knowledge</title>
            </Head>

            <div
                className={cn(
                    'flex h-screen w-screen items-center justify-center bg-border dark:bg-border/50',
                    FONT_POPPINS.className
                )}
            >
                <StyledCard className='w-[30rem] px-6 py-6'>
                    <h2 className='text-2xl font-bold uppercase'>Sign In</h2>
                    <h3 className='text-sm text-muted-foreground'>
                        Sign in your account to access the projects.
                    </h3>
                    <SignInForm />
                </StyledCard>
            </div>
        </>
    )
}

SignInPage.getLayout = (page: NextPage) => page

export default SignInPage
