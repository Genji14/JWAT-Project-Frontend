import SignInForm from '@/components/pages/SignIn/SignInForm';
import { cn } from '@/lib/utils';
import { FONT_POPPINS } from '@/lib/constants/SettingSystem';
import { NextPage } from 'next';
import React from 'react'
import StyledCard from '@/components/general/StyledCard';

const SignInPage = () => {
    return (
        <div className={cn("h-screen w-screen flex items-center justify-center bg-border dark:bg-border/50", FONT_POPPINS.className)}>
            <StyledCard className="px-6 py-6 w-[30rem]">
                <h2 className="font-bold text-2xl uppercase">Sign In</h2>
                <h3 className="text-muted-foreground text-sm">Sign in your account to access the projects.</h3>
                <SignInForm />
            </StyledCard>
        </div>
    )
}

SignInPage.getLayout = (page: NextPage) => page;


export default SignInPage;

