import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IUserSignIn } from '@/types/interfaces'
import { loginSchema } from '@/lib/schemas'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { LoaderButton } from '@/components/shared/LoaderButton'
import { Input } from '@/components/ui/input'
import { CircleUser, KeyRound } from 'lucide-react'
import { useSignIn } from '@/hooks/mutation'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'
import { AUTH_RESPONSE_MESSAGE } from '@/lib/constants/RequestMessage'

const SignInForm: React.FC = () => {
    const loginForm = useForm<IUserSignIn>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const { isPendingSignIn, mutateSignIn } = useSignIn()

    async function onSubmit(values: IUserSignIn) {
        try {
            await mutateSignIn(values)
        } catch (error: any) {
            if (error.response?.status === HttpStatusCode.Unauthorized) {
                toast.error(AUTH_RESPONSE_MESSAGE.LOGIN.BAD_REQUEST)
            } else {
                toast.error(AUTH_RESPONSE_MESSAGE.LOGIN.SERVER_ERROR)
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
                    <LoaderButton isLoading={isPendingSignIn}>
                        Continue
                    </LoaderButton>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm
