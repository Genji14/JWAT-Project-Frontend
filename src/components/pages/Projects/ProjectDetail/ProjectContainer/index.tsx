import React from 'react'
import BlogList from '../BlogList'
import ProjectKnowledge from '../ProjectKnowledge'

const ProjectContainer: React.FC = () => {
    return (
        <div className='grid grid-cols-3 gap-4 lg:grid-cols-12 '>
            <div className='col-span-3 flex w-full flex-col gap-2 lg:col-span-7 lg:col-start-2'>
                <BlogList />
            </div>
            <div className='relative col-span-3 hidden w-full lg:col-start-10 lg:block'>
                <div className='sticky top-40'>
                    <ProjectKnowledge knowledge={'hehe'} />
                </div>
            </div>
        </div>
    )
}

export default ProjectContainer
