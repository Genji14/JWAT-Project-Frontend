import { cn } from '@/lib/utils'
import { FONT_POPPINS } from '@/lib/constants/SettingSystem'
import React, { ReactElement } from 'react'
import StyledCard from '@/components/shared/StyledCard'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'
import { NextPageWithLayout } from '../_app'

const SignInForm = dynamic(
    () => import('@/components/pages/SignIn/SignInForm'),
    {
        loading: () => <Spinner />,
        ssr: false,
    }
)

const SignInPage: NextPageWithLayout = () => {
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
                <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                {/* <div className="absolute inset-0 hidden dark:block  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#2563eb_100%)]"></div> */}
                <div className="absolute bottom-0 dark:hidden left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

                <StyledCard className='w-[30rem] px-6 py-6 z-10'>
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

SignInPage.getLayout = (page: ReactElement) => page

export default SignInPage;
