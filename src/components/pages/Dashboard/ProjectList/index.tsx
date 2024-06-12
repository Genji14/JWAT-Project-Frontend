import { useSearchProject } from '@/hooks/query'
import React from 'react'
import ProjectLoader from '../ProjectLoader'
import { IProject } from '@/types/interfaces/Project'
import ProjectItem from './ProjectItem'
import dynamic from 'next/dynamic'
import { useSearchProjectContext } from '@/lib/contexts/SearchProjectContext'

const EmptyMessage = dynamic(() => import('./EmptyMessage'), {
    ssr: false,
})

const ProjectList = () => {
    const { debounceQuery } = useSearchProjectContext();
    const { isFetchingProjectList, projectListData } = useSearchProject(debounceQuery)

    if (isFetchingProjectList) {
        return <ProjectLoader />
    }

    return (
        <>
            {
                projectListData && projectListData.length > 0 ? <div className='my-4 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                    {
                        projectListData?.map((project: IProject) => {
                            return <ProjectItem key={project.id} project={project} />
                        })
                    }
                </div> : <EmptyMessage />
            }
        </>
    )
}

export default ProjectList
