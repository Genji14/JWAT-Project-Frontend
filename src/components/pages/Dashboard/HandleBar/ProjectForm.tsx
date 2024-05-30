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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { projectSchema } from '@/lib/schemas'
import { IProjectForm } from '@/types/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePlus2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import DocumentInput from './DocumentInput'

const ProjectForm = () => {
    const addProjectForm = useForm<IProjectForm>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectName: '',
            description: '',
        },
    })

    async function onSubmit(values: IProjectForm) {}

    return (
        <>
            <Form {...addProjectForm}>
                <form
                    onSubmit={addProjectForm.handleSubmit(onSubmit)}
                    className='mt-4 space-y-4'
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
                                <FormDescription>
                                    Describe about this project to understand
                                    what we're doing.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-col space-y-2'>
                        <Label>
                            Member{' '}
                            <span className='text-muted-foreground/50'>
                                (Optional)
                            </span>
                        </Label>
                        <div className=''></div>
                    </div>

                    <DocumentInput />

                    <Button type='submit' className='w-full'>
                        Complete
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default ProjectForm
