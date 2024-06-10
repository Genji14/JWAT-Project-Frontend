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

const ProjectForm = () => {
    const addProjectForm = useForm<IProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectName: '',
            description: '',
            logo: undefined
        },
    })

    async function onSubmit(values: IProjectForm) {
        console.log(values)

    }

    return (
        <>
            <DialogHeader className="space-y-0">
                <h3 className='text-xl font-bold uppercase leading-0'>
                    Create New Project
                </h3>
                <DialogDescription>
                    Name a project for sharing knowledge each
                    other.
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <Form {...addProjectForm}>
                <form
                    onSubmit={addProjectForm.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={addProjectForm.control}
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
                        control={addProjectForm.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Describe about this project to understand
                                    what we're doing.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <PhotoInput form={addProjectForm} />
                    <div className="w-full pt-2">
                        <Button type='submit' className='w-full'>
                            Complete
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default ProjectForm
