import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Media } from '@/types'
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
                        <Image
                            className='absolute -top-8 right-16 aspect-square w-1/2 object-cover'
                            src={media[0].url}
                            alt='Blog Media'
                            width={1000}
                            height={1000}
                        />
                        <div className='relative ml-16 aspect-square w-1/2 translate-y-8'>
                            {media.length > 2 && (
                                <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/50'>
                                    <span className='text-4xl font-semibold text-white'>
                                        +{media.length - 1}
                                    </span>
                                </div>
                            )}
                            <Image
                                className=' h-full w-full object-cover'
                                src={media[1].url}
                                alt='Blog Media'
                                width={1000}
                                height={1000}
                            />
                        </div>
                    </div>
                ) : (
                    <Image
                        className='aspect-video'
                        src={media[0].url}
                        alt='Blog Media'
                        width={1000}
                        height={1000}
                    />
                ))}
        </div>
    )
}

export default AvaiableMedia
