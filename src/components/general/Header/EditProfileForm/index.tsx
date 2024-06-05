import { Button } from '@/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { IUpdateUserForm, IUserInfo } from '@/types/interfaces'
import React, { FC, PropsWithChildren, useCallback } from 'react'
import PersonalForm from './PersonalForm'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserSchema } from '@/lib/schemas'
import { Gender } from '@/types/enums'
import { Form } from '@/components/ui/form'
import AvatarForm from './AvatarForm'
import { useUpdateProfile } from '@/hooks/mutation'
import { HttpStatusCode } from 'axios'
import { toast } from 'sonner'

type IEditProfileContentProps = PropsWithChildren<{
    userInfo?: IUserInfo
}>

const EditProfileContent: FC<IEditProfileContentProps> = ({ userInfo }) => {

    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
    const { mutateUpdateProfile, isPendingUpdateProfile } = useUpdateProfile();

    const editProfileForm = useForm<IUpdateUserForm>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            address: "",
            gender: Gender.OTHER,
            phoneNumber: "",
        },
    })

    const handleAvatarChange = useCallback((file: File | null) => {
        setAvatarFile(file);
    }, [])


    async function onSubmit(data: IUpdateUserForm) {
        const formData = new FormData();
        formData.append('user', new Blob([JSON.stringify(data)], { type: "application/json" }));
        if (avatarFile)
            formData.append('images', avatarFile);
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
            <DialogHeader>
                <h3 className='text-xl font-bold uppercase'>Edit profile</h3>
                <DialogDescription>
                    Provide new informations to change your profile.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...editProfileForm}>
                <form onSubmit={editProfileForm.handleSubmit(onSubmit)} className="grid gap-4 mb-2">
                    <AvatarForm onAvatarChange={handleAvatarChange} />
                    <Separator />
                    <PersonalForm form={editProfileForm} />
                </form>
            </Form>
            <DialogFooter>
                <Button onClick={() => editProfileForm.handleSubmit(onSubmit)()} className='xl:w-fit px-4 h-fit py-1.5'>Save</Button>
            </DialogFooter >
        </>
    )
}

export default EditProfileContent
