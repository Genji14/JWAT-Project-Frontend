import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { knowledgeSchema } from '@/lib/schemas';
import { IKnowledgeForm } from '@/types/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, X } from 'lucide-react';
import React, { SetStateAction } from 'react'
import { useForm } from 'react-hook-form';

const KnowledgeForm = ({ setIsAdding }: { setIsAdding: React.Dispatch<SetStateAction<boolean>> }) => {

    const createKnowledgeForm = useForm<IKnowledgeForm>({
        resolver: zodResolver(knowledgeSchema),
        defaultValues: {
            image: undefined,
            knowledgeName: ""
        }
    })

    return (
        <Form {...createKnowledgeForm}>
            <form className="grid grid-cols-2 lg:grid-cols-5 gap-2 items-center">
                <div className='col-span-2'>

                </div>
                <FormField
                    control={createKnowledgeForm.control}
                    name='knowledgeName'
                    render={({ field }) => (
                        <FormItem className='space-y-1 col-span-2'>
                            <FormControl>
                                <Input
                                    line={true}
                                    className='rounded-none border-0 border-b'
                                    placeholder='Knowledge Name'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-center gap-2">
                    <Button className="bg-green-600/90 hover:bg-green-600 p-1 h-fit w-fit">
                        <Check className="w-5 h-5" />
                    </Button>
                    <Button type="button" className="p-1 h-fit w-fit" variant={"destructive"} onClick={() => setIsAdding(false)}>
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </form>
        </Form>

    )
}

export default KnowledgeForm;