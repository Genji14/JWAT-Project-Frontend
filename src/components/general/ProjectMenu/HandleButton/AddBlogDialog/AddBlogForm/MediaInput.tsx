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
import { cn } from '@/lib/utils'
import { IBlogForm } from '@/types/interfaces/Form'
import { FilePlus2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const MediaInput = ({
    form,
}: {
    form: UseFormReturn<IBlogForm, any, undefined>
}) => {
    const [media, setMedia] = useState<string>('')
    const [isDragging, setIsDragging] = useState<boolean>(false)

    useEffect(() => {
        const notFoundMedia = () => {
            if (!form.getValues('media')) {
                setMedia('')
            }
        }
        notFoundMedia()
    }, [form.getValues('media')])

    const handleChangeMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (
                file &&
                (file.type === 'image/jpeg' || file.type === 'image/png')
            ) {
                form.setValue('media', file)
                setMedia(URL.createObjectURL(file))
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
                form.setValue('media', file)
                setMedia(URL.createObjectURL(file))
            }
        }
        setIsDragging(false)
    }

    const handleRemoveMedia = () => {
        setMedia('')
        form.setValue('media', undefined)
    }

    return (
        <FormField
            control={form.control}
            name='media'
            render={() => (
                <FormItem className='space-y-2'>
                    <FormLabel>Attach Media</FormLabel>
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
                            !media && 'cursor-pointer'
                        )}
                    >
                        {media && (
                            <>
                                <Button
                                    type='button'
                                    variant={'destructive'}
                                    className='absolute right-1.5 top-1.5 p-1'
                                    onClick={handleRemoveMedia}
                                >
                                    <X className='h-3 w-3' />
                                </Button>
                                <div className='h-full w-full'>
                                    <Image
                                        width={3000}
                                        height={3000}
                                        src={media}
                                        alt='Project Logo'
                                        className='aspect-[25/9] object-cover'
                                    />
                                </div>
                            </>
                        )}
                        {!media && (
                            <Label
                                htmlFor='project-logo-input'
                                className='flex cursor-pointer items-center justify-center gap-1'
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
                                        id='project-logo-input'
                                        type='file'
                                        className='hidden'
                                        onChange={handleChangeMedia}
                                        multiple
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

export default MediaInput
