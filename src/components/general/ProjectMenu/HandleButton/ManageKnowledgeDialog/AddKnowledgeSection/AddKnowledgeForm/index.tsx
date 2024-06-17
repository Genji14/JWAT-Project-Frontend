import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { knowledgeSchema } from '@/lib/schemas';
import { IKnowledgeForm } from '@/types/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2, X } from 'lucide-react';
import React, { SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import PhotoInput from './PhotoInput';
import { useCreateKnowledge } from '@/hooks/mutation/knowledge.mutation';
import { useRouter } from 'next/router';

const KnowledgeForm = ({ setIsAdding }: { setIsAdding: React.Dispatch<SetStateAction<boolean>> }) => {

    const { mutateCreateKnowledge, isPendingCreateKnowledge } = useCreateKnowledge();
    const { query } = useRouter();

    const createKnowledgeForm = useForm<IKnowledgeForm>({
        resolver: zodResolver(knowledgeSchema),
        defaultValues: {
            knowledgeName: ""
        }
    })

    async function onSubmit(values: IKnowledgeForm) {
        try {
            const formData = new FormData();
            formData.append("project", query.id as string);
            formData.append("name", values.knowledgeName);
            formData.append("files", values.image);
            await mutateCreateKnowledge(formData);
            setIsAdding(false);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Form {...createKnowledgeForm}>
            <form onSubmit={createKnowledgeForm.handleSubmit(onSubmit)} className="grid grid-cols-2 lg:grid-cols-7 gap-3 items-center">
                <div className='col-span-3'>
                    <PhotoInput form={createKnowledgeForm} isPending={isPendingCreateKnowledge} />
                </div>
                <FormField
                    control={createKnowledgeForm.control}
                    name='knowledgeName'
                    render={({ field }) => (
                        <FormItem className='space-y-1 col-span-3'>
                            <FormControl>
                                <Input
                                    line={true}
                                    disabled={isPendingCreateKnowledge}
                                    className='rounded-none border-0 border-b py-6'
                                    placeholder='Knowledge name'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-end gap-2 transition-all">
                    <Button disabled={isPendingCreateKnowledge} className="bg-green-600/90 hover:bg-green-600 p-2 h-fit w-fit transition-all">
                        {isPendingCreateKnowledge && <span className="mr-1 text-xs">Submitting</span>}
                        {isPendingCreateKnowledge ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    </Button>
                    {
                        !isPendingCreateKnowledge &&
                        <Button type="button" className="p-2 h-fit w-fit" variant={"destructive"} onClick={() => setIsAdding(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    }
                </div>
            </form>
        </Form >

    )
}

export default KnowledgeForm;