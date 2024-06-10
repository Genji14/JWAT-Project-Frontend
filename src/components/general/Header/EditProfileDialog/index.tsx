import { Button } from '@/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { IUserInfo } from '@/types/interfaces'
import React, { FC, PropsWithChildren, useCallback } from 'react'
import PersonalForm from './PersonalForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema } from '@/lib/schemas'
import { Form } from '@/components/ui/form'
import AvatarForm from './AvatarForm'
import { useUpdateProfile } from '@/hooks/mutation'
import { Loader2 } from 'lucide-react'
import { IUpdateUserForm } from '@/types/interfaces/Form'

type IEditProfileDialogProps = PropsWithChildren<{
    userInfo: IUserInfo
}>

const EditProfileDialog: FC<IEditProfileDialogProps> = ({ userInfo }) => {

    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
    const { mutateUpdateProfile, isPendingUpdateProfile } = useUpdateProfile();

    const editProfileForm = useForm<IUpdateUserForm>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            address: userInfo.address,
            gender: userInfo.gender,
            phoneNumber: userInfo.phoneNumber,
        },
    })

    const handleAvatarChange = useCallback((file: File | null) => {
        setAvatarFile(file);
    }, [])


    async function onSubmit(data: IUpdateUserForm) {
        const formData = new FormData();
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        if (avatarFile)
            formData.append('files', avatarFile);
        try {
            await mutateUpdateProfile(formData);
        } catch (error: any) {
            // if (error.response?.status === HttpStatusCode.Unauthorized) {
            //     toast.error(AUTH_RESPONSE_MESSAGE.LOGIN.BAD_REQUEST)
            // } else {
            //     toast.error(AUTH_RESPONSE_MESSAGE.LOGIN.SERVER_ERROR)
            // }
        }
    }

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='font-bold uppercase text-xl'>User profile</h3>
                <DialogDescription>
                    Provide new informations to change your profile.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...editProfileForm}>
                <form onSubmit={editProfileForm.handleSubmit(onSubmit)} className="grid gap-4 mb-2">
                    <AvatarForm isPending={isPendingUpdateProfile} onAvatarChange={handleAvatarChange} userInfo={userInfo} />
                    <Separator />
                    <PersonalForm isPending={isPendingUpdateProfile} form={editProfileForm} />
                </form>
            </Form>
            <DialogFooter>
                <Button disabled={isPendingUpdateProfile} onClick={() => editProfileForm.handleSubmit(onSubmit)()} className='xl:w-fit px-4 h-fit py-1.5'>
                    <span>Save</span>
                    {isPendingUpdateProfile && <Loader2 className='ml-2 h-4 w-4 animate-spin' />}
                </Button>
            </DialogFooter>
        </>
    )
}

export default EditProfileDialog
