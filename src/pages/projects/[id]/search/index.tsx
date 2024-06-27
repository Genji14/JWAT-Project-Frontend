import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import SearchBlogContainer from '@/components/pages/Projects/SearchBlog/SearchBlogContainer'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IBlog } from '@/types/interfaces/Blog'
import { IProject } from '@/types/interfaces/Project'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'

const SearchBlogPage = ({
    project,
    blogs,
}: {
    project: IProject
    blogs: IBlog
}) => {
    return (
        <>
            <Head key={'member-project-detail'}>
                <title>{`Members of ${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <SearchBlogContainer />
                </ProjectDetailLayout>
            </ProjectDetailProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    setContext(context)
    const { id, text: searchQuery } = context.query
    console.log(searchQuery)
    const project = await projectService.findOne(Number(id))
    return { props: { project: project.data } }
}

export default SearchBlogPage
