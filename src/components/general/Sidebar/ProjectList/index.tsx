import { useSearchProject } from '@/hooks/query'
import { IProject } from '@/types/interfaces/Project'
import React from 'react'
import SidebarItem from '../SidebarItem'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

const SidebarProjectList = () => {
    const { isFetchingProjectList, projectListData } = useSearchProject()

    if (isFetchingProjectList) {
        return (
            <div className='space-y-2 w-full'>
                <div className='flex items-center gap-3 w-full p-2'>
                    <Skeleton className='h-10 w-10 bg-accent' />
                    <Skeleton className='h-6 flex-auto bg-accent' />
                </div>
                <div className='flex items-center gap-3 w-full p-2'>
                    <Skeleton className='h-10 w-10 bg-accent p-2' />
                    <Skeleton className='h-6 flex-auto  bg-accent' />
                </div>
                <div className='flex items-center gap-3 w-full p-2'>
                    <Skeleton className='h-10 w-10 bg-accent' />
                    <Skeleton className='h-6 flex-auto bg-accent' />
                </div>
                <div className='flex items-center gap-3 w-full p-2'>
                    <Skeleton className='h-10 w-10 bg-accent p-2' />
                    <Skeleton className='h-6 flex-auto  bg-accent' />
                </div>
            </div>
        )
    }

    return (
        <>
            {projectListData &&
                projectListData.length > 0 &&
                projectListData.map((project: IProject) => {
                    return (
                        <SidebarItem
                            key={project.id}
                            label={project.name.toUpperCase()}
                            href={`/projects/${project.id}`}
                            icon={
                                <Image
                                    src={project.media.url}
                                    alt={project.name}
                                    width={500}
                                    height={500}
                                    className='aspect-square w-10 rounded object-cover'
                                />
                            }
                        />
                    )
                })}
        </>
    )
}

export default SidebarProjectList;
