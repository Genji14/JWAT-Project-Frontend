import { Button } from '@/components/ui/button';
import { DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useChangePassword } from '@/hooks/mutation';
import { passwordSchema } from '@/lib/schemas';
import { IChangePasswordForm, IPasswordForm } from '@/types/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';


const PasswordDialog: FC = () => {

    const { mutateChangePassword, isPendingChangePassword, isSuccessChangePassword } = useChangePassword();

    const passwordForm = useForm<IPasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirm: ""
        }
    })

    useEffect(() => {
        if (isSuccessChangePassword) {
            passwordForm.reset();
        }
    }, [isPendingChangePassword])

    async function onSubmit(data: IPasswordForm) {
        const reqForm: IChangePasswordForm = {
            oldPassword: data.oldPassword,
            password: data.password
        }
        try {
            await mutateChangePassword(reqForm);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='font-bold uppercase text-xl'>Change Password</h3>
                <DialogDescription>
                    Type your current password and new password to change.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onSubmit)} className="grid gap-4 mb-2">
                    <FormField
                        control={passwordForm.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem className='space-y-1'>
                                <FormLabel>Old password</FormLabel>
                                <FormControl>
                                    <Input type="password" disabled={isPendingChangePassword} placeholder="*******" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid gap-x-4 gap-y-2'>
                        <div className='grid xl:grid-cols-2 gap-4 '>
                            <FormField
                                control={passwordForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <Input type="password" disabled={isPendingChangePassword} placeholder="*******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirm"
                                render={({ field }) => (
                                    <FormItem className='space-y-1'>
                                        <FormLabel>Confirm password</FormLabel>
                                        <FormControl>
                                            <Input type='password' disabled={isPendingChangePassword} placeholder="*******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>
                </form>
            </Form>
            <DialogFooter>
                <Button disabled={isPendingChangePassword} onClick={() => passwordForm.handleSubmit(onSubmit)()} className='xl:w-fit px-4 h-fit py-1.5'>
                    <span>Save</span>
                    {isPendingChangePassword && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
                </Button>
            </DialogFooter>
        </>
    );
};

export default PasswordDialog;
