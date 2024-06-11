import { useSearchProject } from '@/hooks/query'
import { IProject } from '@/types/interfaces/Project'
import React from 'react'
import SidebarItem from '../SidebarItem'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

const SideBarProjectList = () => {
    const { isFetchingProjectList, projectListData } = useSearchProject()

    if (isFetchingProjectList) {
        return (
            <div className='space-y-2 '>
                <Skeleton className='h-12 w-12 bg-accent' />
                <Skeleton className='h-12 w-12 bg-accent' />
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
                            label={project.name}
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

export default SideBarProjectList
