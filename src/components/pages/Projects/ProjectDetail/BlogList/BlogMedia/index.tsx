import { Media } from '@/types'
import Image from 'next/image'
import React from 'react'

const BlogMedia = ({ media }: { media: Media[] }) => {
    switch (media.length) {
        case 1:
            return (
                <div className='aspect-[25/9] w-full'>
                    <Image src={media[0].url} alt="Blog Image" className='object-cover' width={1000} height={1000} />
                </div>
            )
        case 2:
            return (
                <div className='aspect-[25/9] w-full grid grid-cols-2 gap-1.5'>
                    <Image src={media[0].url} alt="Blog Image" className='object-cover aspect-square' width={1000} height={1000} />
                    <Image src={media[1].url} alt="Blog Image" className='object-cover aspect-square' width={1000} height={1000} />
                </div>
            )
        case 3:
            return (
                <div className='aspect-video w-full grid grid-cols-2 gap-1.5'>
                    <Image src={media[0].url} alt="Blog Image" className='object-cover h-full' width={1000} height={1000} />
                    <div className="grid grid-rows-2 gap-1.5">
                        <Image src={media[1].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                        <Image src={media[2].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                    </div>
                </div>
            )
        default:
            return (
                <div className='aspect-[25/9] w-full grid grid-cols-2 gap-1.5'>
                    <Image src={media[0].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                    <Image src={media[1].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                    <Image src={media[2].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                    <div className="relative">
                        {
                            media.length > 4 && <div className='absolute z-10 bg-black/50 inset-0 flex justify-center items-center'>
                                <span className='font-semibold text-4xl'>+{media.length - 4}</span>
                            </div>
                        }
                        <Image src={media[3].url} alt="Blog Image" className='object-cover aspect-video' width={1000} height={1000} />
                    </div>
                </div>
            )
    }
}

export default BlogMedia