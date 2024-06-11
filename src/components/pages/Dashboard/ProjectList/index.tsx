import { useSearchProject } from '@/hooks/query'
import React from 'react'
import ProjectLoader from '../ProjectLoader'
import { IProject } from '@/types/interfaces/Project'
import ProjectItem from './ProjectItem'
import dynamic from 'next/dynamic'

const EmptyMessage = dynamic(() => import('./EmptyMessage'), {
    ssr: false,
})

const ProjectList = () => {
    const { isFetchingProjectList, projectListData } = useSearchProject()

    if (isFetchingProjectList) {
        return <ProjectLoader />
    }

    return (
        <div className='my-4 grid grid-cols-4 gap-4'>
            {projectListData ? (
                projectListData?.map((project: IProject) => {
                    return <ProjectItem key={project.id} project={project} />
                })
            ) : (
                <EmptyMessage />
            )}
        </div>
    )
}

export default ProjectList
