import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { documentSchema } from '@/lib/schemas';
import { ICreateDocumentForm } from '@/types/interfaces/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import FilesInput from './FilesInput';
import { useAddDocument } from '@/hooks/mutation/project.mutation';
import { Loader2Icon } from 'lucide-react';

const DocumentForm = () => {

    const { mutateAddDocument, isPendingAddDocument } = useAddDocument();

    const documentForm = useForm<ICreateDocumentForm>({
        resolver: zodResolver(documentSchema),
        defaultValues: {
            files: []
        }
    });

    async function onSubmit(values: ICreateDocumentForm) {
        const formData = new FormData();
        values.files.forEach((file) => {
            formData.append('files', file);
        });
        try {
            await mutateAddDocument(formData);
            documentForm.reset();
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Form {...documentForm}>
            <form onSubmit={documentForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FilesInput form={documentForm} />
                <Button type="submit" disabled={isPendingAddDocument}>
                    Add Document
                    {isPendingAddDocument && <Loader2Icon className='w-4 h-4 ml-2 animate-spin' />}
                </Button>
            </form>
        </Form>
    );
};

export default DocumentForm;
