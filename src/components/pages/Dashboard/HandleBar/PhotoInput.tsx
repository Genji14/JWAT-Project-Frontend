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
import { IProjectForm } from '@/types/interfaces/Form'
import { FilePlus2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

const PhotoInput = ({
    form,
}: {
    form: UseFormReturn<IProjectForm, any, undefined>
}) => {
    const [photo, setPhoto] = useState<string>('')
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const handleChangePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            if (
                file &&
                (file.type === 'image/jpeg' || file.type === 'image/png')
            ) {
                form.setValue('logo', file)
                setPhoto(URL.createObjectURL(file))
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
                form.setValue('logo', file)
                setPhoto(URL.createObjectURL(file))
            }
        }
        setIsDragging(false)
    }

    const handleRemovePhoto = () => {
        setPhoto('')
        form.setValue('logo', undefined)
    }

    return (
        <FormField
            control={form.control}
            name='logo'
            render={() => (
                <FormItem className='space-y-2'>
                    <FormLabel>Logo Image</FormLabel>
                    <div
                        onDragOver={(event) => {
                            event.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(evt) => handleDrop(evt)}
                        className={cn(
                            'relative rounded border-2 border-dashed border-muted-foreground/50 p-3 text-sm font-medium text-muted-foreground/50',
                            isDragging &&
                                'cursor-copy border-primary bg-accent text-primary shadow-lg',
                            !photo && 'cursor-pointer'
                        )}
                    >
                        {photo && (
                            <>
                                <Button
                                    type='button'
                                    variant={'destructive'}
                                    className='absolute right-1.5 top-1.5 h-fit w-fit p-1'
                                    onClick={handleRemovePhoto}
                                >
                                    <X className='h-3 w-3' />
                                </Button>
                                <div className='h-full w-full'>
                                    <Image
                                        width={3000}
                                        height={3000}
                                        src={photo}
                                        alt='Project Logo'
                                        className='aspect-[25/9] object-cover'
                                    />
                                </div>
                            </>
                        )}
                        {!photo && (
                            <Label
                                htmlFor='project-logo-input'
                                className='flex items-center justify-center gap-1'
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

export default PhotoInput
