import { useStore } from '@/components/providers/StoreProvider'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useAddDocumentGroup } from '@/hooks/mutation/project.mutation'
import { documentGroupSchema } from '@/lib/schemas'
import { ICreateDocumentGroupForm } from '@/types/interfaces/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const DocumentGroupForm = ({ parent }: { parent?: number }) => {
    const documentRoot = useStore((state) => state.documentRoot)
    const { mutateAddDocumentGroup, isPendingAddDocumentGroup } =
        useAddDocumentGroup()

    const documentGroupForm = useForm<ICreateDocumentGroupForm>({
        resolver: zodResolver(documentGroupSchema),
        defaultValues: {
            parent: parent ?? documentRoot?.id,
            name: '',
            documents: [],
        },
    })

    async function onSubmit(values: ICreateDocumentGroupForm) {
        if (!!documentGroupForm.getValues('documents')?.length) {
            values = {
                ...values,
                documents: documentGroupForm.getValues('documents'),
            }
        }
        try {
            await mutateAddDocumentGroup(values)
            documentGroupForm.resetField('name')
            documentGroupForm.setValue('documents', [])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...documentGroupForm}>
            <form
                onSubmit={documentGroupForm.handleSubmit(onSubmit)}
                className='flex flex-col space-y-2'
            >
                <FormField
                    control={documentGroupForm.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Group Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='dark:focus-visible:outline-none'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={documentGroupForm.control}
                    name='documents'
                    render={() => (
                        <FormItem>
                            <div className='mb-4'>
                                <FormLabel>Documents</FormLabel>
                                <FormDescription>
                                    Select the documents to add into this
                                    document group.
                                </FormDescription>
                            </div>
                            {documentRoot?.documents.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={documentGroupForm.control}
                                    name='documents'
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className='flex flex-row items-start space-x-3 space-y-0'
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(
                                                            item.id
                                                        )}
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            const newValues =
                                                                checked
                                                                    ? [
                                                                          ...field.value,
                                                                          item.id,
                                                                      ]
                                                                    : field.value?.filter(
                                                                          (
                                                                              value
                                                                          ) =>
                                                                              value !==
                                                                              item.id
                                                                      )
                                                            field.onChange(
                                                                newValues
                                                            )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
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
                    <Button
                        className='w-full'
                        disabled={isPendingAddDocumentGroup}
                    >
                        <span> Add Document Group</span>
                        {isPendingAddDocumentGroup && (
                            <Loader2 className='ml-3 h-4 w-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default DocumentGroupForm
