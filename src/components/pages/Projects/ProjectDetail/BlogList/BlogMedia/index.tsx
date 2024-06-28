import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Media } from '@/types'
import { MediaType } from '@/types/enums';
import { PlayIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const BlogMedia = ({ media }: { media: Media[] }) => {
    const [selectedImageIndex, setSelectedIamgeIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const [zoom, setZoom] = useState<number>(1)

    const videoArr = media.filter(item => item.mediaType === MediaType.VIDEO);
    const iamgeArr = media.filter(item => item.mediaType === MediaType.IMAGE);


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

            {
                videoArr.length > 0 ?
                    <div className={cn(media.length >= 2 && "grid grid-cols-2 gap-1.5")}>
                        <iframe
                            src={`https://player.cloudinary.com/embed/?cloud_name=dzfwvoijo&public_id=${videoArr[0].cloudId}`}
                            className={cn("w-full", media.length >= 2 ? "aspect-square" : "aspect-video")}
                            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                        />
                        {media.length >= 2 &&
                            <div className='relative'>
                                {media.length > 2 &&
                                    <div onClick={() => handleSelectImage(media.indexOf(iamgeArr[0]))} className='cursor-pointer absolute z-10 bg-black/20 dark:bg-black/50 inset-0 flex justify-center items-center'>
                                        <span className='font-semibold text-4xl text-white'>+{media.length - 2}</span>
                                    </div>
                                }
                                <Image src={iamgeArr[0].url} alt="Blog Image" onClick={() => handleSelectImage(media.indexOf(iamgeArr[0]))} className='object-cover aspect-square cursor-pointer' width={1000} height={1000} />
                            </div>
                        }
                    </div> :
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
                    </>
            }
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
                    <div className='flex-auto flex justify-center items-center bg-border dark:bg-background rounded-lg overflow-hidden'>
                        {
                            media[selectedImageIndex].mediaType === MediaType.VIDEO ?
                                <iframe
                                    src={`https://player.cloudinary.com/embed/?cloud_name=dzfwvoijo&public_id=${media[selectedImageIndex].cloudId}`}
                                    className='lg:w-3/4 aspect-video'
                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                />
                                : <Image src={media[selectedImageIndex].url} alt="Blog Image" className='object-cover w-fit h-[90%]' style={{ transform: `scale(${zoom})` }} width={1000} height={1000} />

                        }
                    </div>
                    <div className="flex gap-2 justify-center overflow-x-auto bg-border dark:bg-background p-2 rounded-lg">
                        {
                            media.map((item, index) => {
                                if (item.mediaType !== MediaType.VIDEO) {
                                    return <Image onClick={() => handleSelectImage(index)} src={item.url} alt="Blog Image" className={cn('w-20 h-20 object-cover cursor-pointer hover:opacity-100 rounded-lg', index === selectedImageIndex ? 'border-2 border-primary' : 'opacity-50')} width={1000} height={1000} />
                                } else {
                                    return <div onClick={() => handleSelectImage(index)} className={cn('w-20 h-20 bg-background dark:bg-border object-cover cursor-pointer hover:opacity-100 rounded-lg flex items-center justify-center', index === selectedImageIndex ? 'border-2 border-primary' : 'opacity-50')}>
                                        <div className='bg-black/50 p-2 rounded-full'>
                                            <PlayIcon className='text-white w-5 h-5 fill-white' />
                                        </div>
                                    </div>
                                }
                            })
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default BlogMedia
