import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { projectSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { DialogDescription, DialogHeader } from '@/components/ui/dialog'
import PhotoInput from './PhotoInput'
import { IProjectForm } from '@/types/interfaces/Form'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import { useCreateProject } from '@/hooks/mutation/project'

const ProjectForm = () => {
    const { mutateCreateProject, isPendingCreateProject } = useCreateProject();

    const createProjectForm = useForm<IProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectName: '',
            description: '',
            logo: undefined,
        },
    })

    async function onSubmit(values: IProjectForm) {
        try {
            const formData = new FormData()
            formData.append('name', values.projectName)
            formData.append('description', values.description)
            if (values.logo instanceof File) {
                formData.append('files', values.logo)
            }
            await mutateCreateProject(formData)
            createProjectForm.reset()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <DialogHeader className='space-y-0'>
                <h3 className='leading-0 text-xl font-bold uppercase'>
                    Create New Project
                </h3>
                <DialogDescription>
                    Name a project for sharing knowledge each other.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...createProjectForm}>
                <form
                    onSubmit={createProjectForm.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={createProjectForm.control}
                        name='projectName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder='Name the project...'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={createProjectForm.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription className='text-xs'>
                                    Describe about this project to understand
                                    what we're doing.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PhotoInput form={createProjectForm} />
                    <div className='w-full pt-2'>
                        <Button
                            type='submit'
                            disabled={isPendingCreateProject}
                            className='w-full'
                        >
                            <span>Complete</span>
                            {isPendingCreateProject && (
                                <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ProjectForm
