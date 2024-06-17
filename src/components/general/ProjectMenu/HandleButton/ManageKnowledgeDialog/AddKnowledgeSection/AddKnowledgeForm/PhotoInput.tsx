import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { IKnowledgeForm } from '@/types/interfaces/Form'
import { FilePlus2 } from 'lucide-react'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const PhotoInput = ({
    form,
    isPending,
}: {
    form: UseFormReturn<IKnowledgeForm, any, undefined>,
    isPending: boolean,
}) => {
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (
                file &&
                (file.type === 'image/jpeg' || file.type === 'image/png')
            ) {
                form.setValue('image', file)
            }
        }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            const file = event.dataTransfer.items[0].getAsFile()
            if (
                file &&
                (file.type === 'image/jpeg' || file.type === 'image/png')
            ) {
                form.setValue('image', file)
            }
        }
        setIsDragging(false)
    }

    const handleRemovePhoto = () => {
        form.resetField('image')
    }

    return (
        <FormField
            control={form.control}
            name='image'
            render={() => (
                <FormItem className='space-y-2'>
                    <div
                        onDragOver={(event) => {
                            event.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(evt) => handleDrop(evt)}
                        className={cn(
                            'relative rounded border-2 border-dashed border-muted-foreground/50 p-3 text-sm font-medium text-muted-foreground/50 hover:border-primary hover:bg-accent hover:text-primary hover:shadow-lg',
                            isDragging &&
                            'cursor-copy border-primary bg-accent text-primary shadow-lg',
                            !form.getValues("image") && 'cursor-pointer'
                        )}
                    >
                        {form.getValues("image") && (
                            <div className="flex items-center gap-2">

                                <span className='h-full w-full flex-auto truncate'>
                                    {form.getValues("image")?.name}
                                </span>
                                <Button
                                    type='button'
                                    variant={'destructive'}
                                    className='px-2 py-0.5'
                                    onClick={handleRemovePhoto}
                                    disabled={isPending}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                        {!form.getValues("image") && (
                            <Label
                                htmlFor='project-image-input'
                                className='flex items-center justify-center gap-1 cursor-pointer'
                            >
                                <FilePlus2 className='h-5 w-5' />
                                <span className='flex items-center gap-1'>
                                    Attach{' '}
                                    <span className='hidden lg:block'>
                                        {' '}
                                        or drag{' '}
                                    </span>{' '}
                                    the file
                                </span>
                                <FormControl>
                                    <Input
                                        id='project-image-input'
                                        type='file'
                                        className='hidden'
                                        onChange={handleChangePhoto}
                                    />
                                </FormControl>
                            </Label>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default PhotoInput;
