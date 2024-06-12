import { Skeleton } from '@/components/ui/skeleton'
import { IProject } from '@/types/interfaces/Project'
import { format } from 'date-fns'
import { Crown } from 'lucide-react'
import Image from 'next/image'
import React, { FC } from 'react'

interface IProjectItemProps {
    project: IProject
}

const ProjectItem: FC<IProjectItemProps> = ({ project }) => {
    return (
        <div className='aspect-square overflow-hidden flex flex-col rounded-lg shadow-md'>
            <div className='bg-background dark:bg-accent flex-auto'>
                <Image
                    height={500}
                    width={500}
                    className='h-full w-full object-cover aspect-video'
                    src={project.media.url}
                    alt={project.name}
                />

            </div>
            <div className='z-50 rounded-b-lg bg-background p-2 text-center text-sm shadow-md'>
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
                            <div className='text-muted-foreground flex items-center gap-1'>
                                <Crown className='w-3.5 h-3.5' />
                                <span className='text-xs font-normal'>
                                    Owner
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
