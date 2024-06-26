import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateProject } from '@/hooks/mutation/project.mutation'
import { projectSchema } from '@/lib/schemas'
import { IProjectForm } from '@/types/interfaces/Form'
import { IProject } from '@/types/interfaces/Project'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import PhotoInput from '@/components/pages/Dashboard/HandleBar/PhotoInput'
import { Button } from '@/components/ui/button'

const EditProjectForm = ({ project }: { project: IProject }) => {
    const { mutateUpdateProject, isPendingUpdateProject } = useUpdateProject()
    const editProjectForm = useForm<IProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectName: project.name,
            description: project.description,
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
            await mutateUpdateProject(formData)
            document.title = `${values.projectName} - Sharing Knowledge`
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Form {...editProjectForm}>
            <form
                onSubmit={editProjectForm.handleSubmit(onSubmit)}
                className='space-y-4'
            >
                <FormField
                    control={editProjectForm.control}
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
                    control={editProjectForm.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription className='text-xs'>
                                Describe about this project to understand what
                                we&lsquo;re doing.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <PhotoInput form={editProjectForm} url={project.media.url} />
                <div className='w-full pt-2'>
                    <Button
                        type='submit'
                        disabled={isPendingUpdateProject}
                        className='w-full'
                    >
                        <span>Complete</span>
                        {isPendingUpdateProject && (
                            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditProjectForm
