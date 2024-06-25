import AvatarForm from '@/components/general/Header/EditProfileDialog/AvatarForm'
import PersonalForm from '@/components/general/Header/EditProfileDialog/PersonalForm'
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from '@/components/ui/dialog'
import { useUpdateProject } from '@/hooks/mutation/project.mutation'
import { projectSchema } from '@/lib/schemas'
import { IProject } from '@/types/interfaces/Project'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button } from 'react-day-picker'
import { Form, useForm } from 'react-hook-form'

const EditProjectDialog = ({ project }: { project: IProject }) => {
    const { mutateUpdateProject, isPendingUpdateProject } = useUpdateProject()
    const editProjectForm = useForm<IProject>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project.name,
            description: project.description,
        },
    })

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='text-xl font-bold uppercase'>Project profile</h3>
                <DialogDescription>
                    Provide new informations to change the project informations.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            {/* <Form {...editProfileForm}>
                <form
                    onSubmit={editProfileForm.handleSubmit(onSubmit)}
                    className='mb-2 grid gap-4'
                >
                    <AvatarForm
                        isPending={isPendingUpdateProfile}
                        onAvatarChange={handleAvatarChange}
                        userInfo={userInfo}
                    />
                    <Separator />
                    <PersonalForm
                        isPending={isPendingUpdateProfile}
                        form={editProfileForm}
                    />
                </form>
            </Form> */}
            <DialogFooter>
                {/* <Button
                    disabled={isPendingUpdateProfile}
                    onClick={() => editProfileForm.handleSubmit(onSubmit)()}
                    className='h-fit px-4 py-1.5 xl:w-fit'
                >
                    <span>Save</span>
                    {isPendingUpdateProfile && (
                        <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                    )}
                </Button> */}
            </DialogFooter>
        </>
    )
}

export default EditProjectDialog
