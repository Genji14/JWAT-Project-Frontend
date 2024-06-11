import { Skeleton } from '@/components/ui/skeleton'
import { IProject } from '@/types/interfaces/Project'
import { format } from 'date-fns'
import Image from 'next/image'
import React, { FC } from 'react'

interface IProjectItemProps {
    project: IProject
}

const ProjectItem: FC<IProjectItemProps> = ({ project }) => {
    return (
        <div className=' relative aspect-square overflow-hidden rounded-lg shadow-md'>
            <div className='h-full rounded-lg bg-background dark:bg-accent'>
                <Image
                    height={5000}
                    width={5000}
                    className='h-full w-full object-cover'
                    src={project.media.url}
                    alt={project.name}
                />
                <div className='absolute bottom-2 left-2 right-2 z-50 rounded bg-background p-1.5 text-center text-sm shadow-md dark:bg-accent'>
                    <div className='flex flex-col gap-2 px-2'>
                        <div className='flex items-center justify-between'>
                            <h2 className='truncate text-left text-base font-bold uppercase'>
                                {project.name}
                            </h2>
                            <h4 className='text-nowrap text-xs text-muted-foreground'>
                                {format(project.createdAt, 'PPP')}
                            </h4>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Skeleton className='h-10 w-10 rounded-full' />
                            <div className='flex h-fit flex-col space-y-0 text-left'>
                                <h5 className='text-sm font-semibold text-primary'>
                                    Vo Phu Phat
                                </h5>
                                <span className='text-xs font-semibold'>
                                    Project owner
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectItem
