import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { IBlogForm } from '@/types/interfaces/Form'
import { FilePlus2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const MediaInput = ({
    form,
}: {
    form: UseFormReturn<IBlogForm, any, undefined>
}) => {

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const media = form.watch('media');

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            const updatedFiles = [...form.getValues('media'), ...newFiles];
            form.setValue('media', updatedFiles);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const newFiles = Array.from(event.dataTransfer.files);
            const updatedFiles = [...form.getValues('media'), ...newFiles];
            form.setValue('media', updatedFiles);
            setIsDragging(false);
        }
    };

    const handleRemoveFile = (index: number) => {
        const updatedFiles = form.getValues('media').filter((_, i) => i !== index);
        form.setValue('media', updatedFiles);
    };


    return (

        <FormField
            control={form.control}
            name='media'
            render={() => (
                <FormItem className='space-y-2'>
                    <FormLabel>Attached media</FormLabel>
                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={cn(
                            'relative rounded border-2 border-dashed border-muted-foreground/50 p-3 text-sm font-medium text-muted-foreground/50 hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg',
                            isDragging && 'cursor-copy border-primary bg-accent text-primary shadow-lg',
                            'cursor-pointer'
                        )}
                    >
                        <Label
                            htmlFor='document-input'
                            className='flex items-center justify-center gap-1 cursor-pointer'
                        >
                            <FilePlus2 className='h-5 w-5' />
                            <span className='flex items-center gap-1'>
                                Attach{' '}
                                <span className='hidden lg:block'> or drag </span> the file(s)
                            </span>
                            <FormControl>
                                <Input
                                    id='document-input'
                                    type='file'
                                    multiple
                                    accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt"
                                    className='hidden'
                                    onChange={handleChangePhoto}
                                />
                            </FormControl>
                        </Label>
                    </div>
                    {media.length > 0 &&
                        <div className="h-32">
                            <ScrollArea className="h-full">
                                <div className='space-y-2 pb-2'>
                                    {media.map((file, index) => (
                                        <div key={index} className='flex items-center gap-2'>
                                            <span className='flex-auto truncate text-muted-foreground text-sm'>{file.name}</span>
                                            <Button
                                                type='button'
                                                variant={'destructive'}
                                                className='px-2 py-1 '
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                <X className='h-3 w-3' />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>

                    }
                    <FormMessage />
                </FormItem>)}
        />

    )
}

export default MediaInput
