import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/schemas'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CircleUser, KeyRound, Loader2 } from 'lucide-react'
import { useSignIn } from '@/hooks/mutation'
import { toast } from 'sonner'
import { AUTH_RESPONSE_MESSAGE, SERVER_MESSAGE } from '@/lib/constants/RequestMessage'
import { Button } from '@/components/ui/button'
import { ISignInForm } from '@/types/interfaces/Form'

const SignInForm: React.FC = () => {
    const loginForm = useForm<ISignInForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const { isPendingSignIn, mutateSignIn } = useSignIn()

    async function onSubmit(values: ISignInForm) {
        try {
            await mutateSignIn(values)
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 500) {
                    toast.error(AUTH_RESPONSE_MESSAGE.LOGIN.SERVER_ERROR)
                } else {
                    toast.error(error.response.data.message)
                }
            } else {
                toast.error(SERVER_MESSAGE.NOT_STARTED)
            }
        }
    }

    return (
        <Form {...loginForm}>
            <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className='mt-6 space-y-6'
            >
                <FormField
                    control={loginForm.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='rounded-none border-0 border-b '
                                    icon={<CircleUser className='h-5 w-5' />}
                                    line={true}
                                    placeholder='Enter your username'
                                    type='text'
                                    disabled={isPendingSignIn}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='rounded-none border-0 border-b pl-0'
                                    icon={<KeyRound className='h-5 w-5' />}
                                    line={true}
                                    placeholder='********'
                                    type='password'
                                    disabled={isPendingSignIn}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className='flex justify-end'>
                    <Button disabled={isPendingSignIn}>
                        <span>Sign In</span>
                        {isPendingSignIn && (
                            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm
