import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Media } from '@/types'
import { ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const BlogMedia = ({ media }: { media: Media[] }) => {
    const [selectedImageIndex, setSelectedIamgeIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const [zoom, setZoom] = useState<number>(1)

    useEffect(() => {
        if (!open) {
            setZoom(1)
            setSelectedIamgeIndex(0)
        }
    }, [open])

    const handleSelectImage = (index: number) => {
        setOpen(true)
        setSelectedIamgeIndex(index)
    }

    return (
        <>
            {(() => {
                switch (media.length) {
                    case 1:
                        return (
                            <div className='aspect-[25/9] w-full'>
                                <Image
                                    onClick={() => handleSelectImage(0)}
                                    src={media[0].url}
                                    alt='Blog Image'
                                    className='cursor-pointer object-cover'
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        )
                    case 2:
                        return (
                            <div className='grid aspect-[25/9] w-full grid-cols-2 gap-1.5'>
                                <Image
                                    onClick={() => handleSelectImage(0)}
                                    src={media[0].url}
                                    alt='Blog Image'
                                    className='aspect-square cursor-pointer object-cover'
                                    width={1000}
                                    height={1000}
                                />
                                <Image
                                    onClick={() => handleSelectImage(1)}
                                    src={media[1].url}
                                    alt='Blog Image'
                                    className='aspect-square cursor-pointer object-cover'
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                        )
                    case 3:
                        return (
                            <div className='grid aspect-video w-full grid-cols-2 gap-1.5'>
                                <Image
                                    onClick={() => handleSelectImage(0)}
                                    src={media[0].url}
                                    alt='Blog Image'
                                    className='h-full object-cover'
                                    width={1000}
                                    height={1000}
                                />
                                <div className='grid grid-rows-2 gap-1.5'>
                                    <Image
                                        onClick={() => handleSelectImage(1)}
                                        src={media[1].url}
                                        alt='Blog Image'
                                        className='aspect-video cursor-pointer object-cover'
                                        width={1000}
                                        height={1000}
                                    />
                                    <Image
                                        onClick={() => handleSelectImage(2)}
                                        src={media[2].url}
                                        alt='Blog Image'
                                        className='aspect-video cursor-pointer object-cover'
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            </div>
                        )
                    default:
                        return (
                            <div className='grid aspect-[25/9] w-full grid-cols-2 gap-1.5'>
                                <Image
                                    onClick={() => handleSelectImage(0)}
                                    src={media[0].url}
                                    alt='Blog Image'
                                    className='aspect-video cursor-pointer object-cover'
                                    width={1000}
                                    height={1000}
                                />
                                <Image
                                    onClick={() => handleSelectImage(1)}
                                    src={media[1].url}
                                    alt='Blog Image'
                                    className='aspect-video cursor-pointer object-cover'
                                    width={1000}
                                    height={1000}
                                />
                                <Image
                                    onClick={() => handleSelectImage(2)}
                                    src={media[2].url}
                                    alt='Blog Image'
                                    className='aspect-video cursor-pointer object-cover'
                                    width={1000}
                                    height={1000}
                                />
                                <div
                                    className='relative cursor-pointer'
                                    onClick={() => handleSelectImage(3)}
                                >
                                    {media.length > 4 && (
                                        <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/20 dark:bg-black/50'>
                                            <span className='text-4xl font-semibold text-white'>
                                                +{media.length - 4}
                                            </span>
                                        </div>
                                    )}
                                    <Image
                                        src={media[3].url}
                                        alt='Blog Image'
                                        className='aspect-video object-cover'
                                        width={1000}
                                        height={1000}
                                    />
                                </div>
                            </div>
                        )
                }
            })()}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='flex h-screen flex-col gap-2 border-none p-0 dark:bg-background/40'>
                    <div className='absolute left-2 top-2 z-10 flex gap-1'>
                        <Button
                            disabled={zoom > 1.5}
                            onClick={() => setZoom((prev) => prev + 0.1)}
                            className='p-2'
                            variant={'outline'}
                        >
                            <ZoomInIcon className='h-5 w-5' />
                        </Button>
                        <Button
                            disabled={zoom < 0.5}
                            onClick={() => setZoom((prev) => prev - 0.1)}
                            className='p-2'
                            variant={'outline'}
                        >
                            <ZoomOutIcon className='h-5 w-5' />
                        </Button>
                    </div>
                    <div className='flex flex-auto items-center justify-center overflow-hidden rounded-lg bg-border dark:bg-background'>
                        <Image
                            src={media[selectedImageIndex].url}
                            alt='Blog Image'
                            className='h-[90%] w-fit object-cover'
                            style={{ transform: `scale(${zoom})` }}
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <div className='flex justify-center gap-2 overflow-x-auto rounded-lg bg-border p-2 dark:bg-background'>
                        {media.map((item, index) => {
                            return (
                                <Image
                                    onClick={() => handleSelectImage(index)}
                                    src={item.url}
                                    alt='Blog Image'
                                    className={cn(
                                        'h-20 w-20 cursor-pointer rounded-lg object-cover hover:opacity-100',
                                        index === selectedImageIndex
                                            ? 'border-2 border-primary'
                                            : 'opacity-50'
                                    )}
                                    width={1000}
                                    height={1000}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BlogMedia
