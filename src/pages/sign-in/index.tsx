import SignInForm from '@/components/pages/SignIn/SignInForm';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { NextPage } from 'next';
import React from 'react'



const SignInPage: NextPage = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-border">
            <div className="bg-background px-6 py-6 w-[30rem] shadow-lg border-b-4 border-primary rounded-lg">
                <h2 className="font-bold text-2xl uppercase">Sign In</h2>
                <h3 className="text-muted-foreground text-sm">Sign in your account to access the projects.</h3>
                <SignInForm />
            </div>
        </div>
    )
}

export default SignInPage;
