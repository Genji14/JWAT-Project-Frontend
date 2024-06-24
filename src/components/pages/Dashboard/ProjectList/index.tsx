import { useSearchProject } from '@/hooks/query'
import React from 'react'
import ProjectLoader from '../ProjectLoader'
import { IProject } from '@/types/interfaces/Project'
import ProjectItem from './ProjectItem'
import dynamic from 'next/dynamic'
import { useSearchProjectContext } from '@/lib/contexts/SearchProjectContext'
import Link from 'next/link'

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
                projectListData && projectListData.length > 0 ? <div className='my-4 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
                    {
                        projectListData?.map((project: IProject) => {
                            return <Link href={`/projects/${project.id}`} key={project.id} >
                                <ProjectItem project={project} />
                            </Link>
                        })
                    }
                </div> : <EmptyMessage />
            }
        </>
    )
}

export default ProjectList
