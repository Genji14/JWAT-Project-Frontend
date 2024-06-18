import { useStore } from '@/components/providers/StoreProvider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { documentGroupSchema } from '@/lib/schemas';
import { ICreateDocumentGroupForm } from '@/types/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const DocumentGroupForm = () => {

    const documentRoot = useStore((state) => state.documentRoot);
    const documentGroupForm = useForm<ICreateDocumentGroupForm>({
        resolver: zodResolver(documentGroupSchema),
        defaultValues: {
            parent: documentRoot?.id,
            name: '',
            documents: []
        }
    })

    async function onSubmit(values: ICreateDocumentGroupForm) {
        console.log(values)
    }

    return (
        <Form {...documentGroupForm}>
            <form onSubmit={documentGroupForm.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                <FormField
                    control={documentGroupForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="dark:focus-visible:outline-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={documentGroupForm.control}
                    name="documents"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel>Documents</FormLabel>
                                <FormDescription>
                                    Select the items you want to display in the sidebar.
                                </FormDescription>
                            </div>
                            {documentRoot?.documents.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={documentGroupForm.control}
                                    name="documents"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.id])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.id
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.name}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='pt-4'>
                    <Button className='w-full'>Add Document Group</Button>
                </div>
            </form>
        </Form>
    )
}

export default DocumentGroupForm;