import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { IUserSignIn } from '@/types/interfaces'
import { loginSchema } from '@/lib/schemas'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CircleUser, KeyRound } from 'lucide-react'
import { useSignIn } from '@/hooks/mutation'

const SignInForm: React.FC = () => {

    const loginForm = useForm<IUserSignIn>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const { isPendingSignIn, mutateSignIn } = useSignIn();

    async function onSubmit(values: IUserSignIn) {
        await mutateSignIn(values);
    }

    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-0 border-b rounded-none "
                                    icon={<CircleUser className="w-5 h-5" />}
                                    line={true}
                                    placeholder='Enter your username'
                                    type="text"
                                    disabled={isPendingSignIn} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-0 border-b rounded-none pl-0"
                                    icon={<KeyRound className="w-5 h-5" />}
                                    line={true}
                                    placeholder='********'
                                    type="password"
                                    disabled={isPendingSignIn} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" className="h-fit" disabled={isPendingSignIn}>Continue</Button>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm;
