import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Media } from '@/types'
import { ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const BlogMedia = ({ media }: { media: Media[] }) => {

    const [selectedImageIndex, setSelectedIamgeIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState<number>(1);

    useEffect(() => {
        if (!open) {
            setZoom(1);
            setSelectedIamgeIndex(0);
        }
    }, [open])

    const handleSelectImage = (index: number) => {
        setOpen(true);
        setSelectedIamgeIndex(index);
    }

    return (
        <>
            {
                (() => {
                    switch (media.length) {
                        case 1:
                            return (
                                <div className='aspect-[25/9] w-full'>
                                    <Image onClick={() => handleSelectImage(0)} src={media[0].url} alt="Blog Image" className='object-cover cursor-pointer' width={1000} height={1000} />
                                </div>
                            )
                        case 2:
                            return (
                                <div className='aspect-[25/9] w-full grid grid-cols-2 gap-1.5'>
                                    <Image onClick={() => handleSelectImage(0)} src={media[0].url} alt="Blog Image" className='object-cover aspect-square cursor-pointer' width={1000} height={1000} />
                                    <Image onClick={() => handleSelectImage(1)} src={media[1].url} alt="Blog Image" className='object-cover aspect-square cursor-pointer' width={1000} height={1000} />
                                </div>
                            )
                        case 3:
                            return (
                                <div className='aspect-video w-full grid grid-cols-2 gap-1.5'>
                                    <Image onClick={() => handleSelectImage(0)} src={media[0].url} alt="Blog Image" className='object-cover h-full' width={1000} height={1000} />
                                    <div className="grid grid-rows-2 gap-1.5">
                                        <Image onClick={() => handleSelectImage(1)} src={media[1].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                        <Image onClick={() => handleSelectImage(2)} src={media[2].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                    </div>
                                </div>
                            )
                        default:
                            return (
                                <div className='aspect-[25/9] w-full grid grid-cols-2 gap-1.5'>
                                    <Image onClick={() => handleSelectImage(0)} src={media[0].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                    <Image onClick={() => handleSelectImage(1)} src={media[1].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                    <Image onClick={() => handleSelectImage(2)} src={media[2].url} alt="Blog Image" className='object-cover aspect-video cursor-pointer' width={1000} height={1000} />
                                    <div className="relative cursor-pointer" onClick={() => handleSelectImage(3)}>
                                        {
                                            media.length > 4 && <div className='absolute z-10 bg-black/20 dark:bg-black/50 inset-0 flex justify-center items-center'>
                                                <span className='font-semibold text-4xl text-white'>+{media.length - 4}</span>
                                            </div>
                                        }
                                        <Image src={media[3].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                                    </div>
                                </div>
                            )
                    }
                })()
            }
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='h-screen dark:bg-background/40 border-none flex flex-col gap-2 p-0'>
                    <div className='absolute top-2 left-2 flex gap-1 z-10'>
                        <Button disabled={zoom > 1.5} onClick={() => setZoom(prev => prev + 0.1)} className='p-2' variant={"outline"}>
                            <ZoomInIcon className='w-5 h-5' />
                        </Button>
                        <Button disabled={zoom < 0.5} onClick={() => setZoom(prev => prev - 0.1)} className='p-2' variant={"outline"}>
                            <ZoomOutIcon className='w-5 h-5' />
                        </Button>
                    </div>
                    <div className='flex-auto flex justify-center items-center bg-border dark:bg-background rounded-lg overflow-hidden'>
                        <Image src={media[selectedImageIndex].url} alt="Blog Image" className='object-cover w-fit h-[90%]' style={{ transform: `scale(${zoom})` }} width={1000} height={1000} />
                    </div>
                    <div className="flex gap-2 justify-center overflow-x-auto bg-border dark:bg-background p-2 rounded-lg">
                        {
                            media.map((item, index) => {
                                return <Image onClick={() => handleSelectImage(index)} src={item.url} alt="Blog Image" className={cn('w-20 h-20 object-cover cursor-pointer hover:opacity-100 rounded-lg', index === selectedImageIndex ? 'border-2 border-primary' : 'opacity-50')} width={1000} height={1000} />
                            })
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )


}

export default BlogMedia