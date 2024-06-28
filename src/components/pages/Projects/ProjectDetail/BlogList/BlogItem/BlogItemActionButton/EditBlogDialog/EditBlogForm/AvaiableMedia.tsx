import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Media } from '@/types'
import { MediaType } from '@/types/enums'
import { PlayIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const AvaiableMedia = ({
    media,
    setMedia,
}: {
    media: Media[]
    setMedia: React.Dispatch<React.SetStateAction<Media[]>>
}) => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <Label>Avaiable media</Label>
                <Button
                    variant={'destructive'}
                    className='rounded px-3 py-1.5 text-xs'
                    type='button'
                    onClick={() => setMedia([])}
                >
                    Remove Media
                </Button>
            </div>
            {media.length > 0 &&
                (media.length !== 1 ? (
                    <div className='relative my-10'>
                        {
                            media[0].mediaType !== MediaType.VIDEO ?
                                <Image
                                    className='absolute -top-8 right-16 aspect-square w-1/2 object-cover rounded-lg'
                                    src={media[0].url}
                                    alt='Blog Media'
                                    width={1000}
                                    height={1000}
                                /> :
                                <div className=' absolute -top-8 right-16 aspect-square w-1/2 bg-background dark:bg-border object-cover cursor-pointer rounded-lg flex items-center justify-center'>
                                    <div className='bg-black/50 p-4 rounded-full'>
                                        <PlayIcon className='text-white w-8 h-8 fill-white' />
                                    </div>
                                </div>
                        }
                        <div className='relative ml-16 aspect-square w-1/2 translate-y-8'>
                            {media.length > 2 && (
                                <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/50'>
                                    <span className='text-4xl font-semibold text-white'>
                                        +{media.length - 1}
                                    </span>
                                </div>
                            )}
                            {
                                media[1].mediaType !== MediaType.VIDEO ?
                                    <Image
                                        className='absolute aspect-square w-full object-cover rounded-lg'
                                        src={media[1].url}
                                        alt='Blog Media'
                                        width={1000}
                                        height={1000}
                                    /> :
                                    <div className='aspect-square bg-background dark:bg-border object-cover cursor-pointer rounded-lg flex items-center justify-center'>
                                        <div className='bg-black/50 p-4 rounded-full'>
                                            <PlayIcon className='text-white w-8 h-8 fill-white' />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                ) : (
                    <>
                        {
                            media[0].mediaType !== MediaType.VIDEO ?
                                <Image
                                    className='aspect-video object-cover rounded-lg'
                                    src={media[0].url}
                                    alt='Blog Media'
                                    width={1000}
                                    height={1000}
                                /> :
                                <div className='aspect-video bg-background dark:bg-border object-cover cursor-pointer rounded-lg flex items-center justify-center'>
                                    <div className='bg-black/50 p-4 rounded-full'>
                                        <PlayIcon className='text-white w-8 h-8 fill-white' />
                                    </div>
                                </div>
                        }
                    </>
                ))}
        </div>
    )
}

export default AvaiableMedia
