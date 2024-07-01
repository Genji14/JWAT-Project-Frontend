import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import SearchBlogContainer from '@/components/pages/Projects/SearchBlog/SearchBlogContainer'
import { useStore } from '@/components/providers/StoreProvider'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/interfaces/Project'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'

const SearchBlogPage = ({
    project,
}: {
    project: IProject
}) => {
    const connect = useStore((state) => state.createSocket)
    const remove = useStore((state) => state.removeSocket)

    useEffect(() => {
        connect()
        return () => {
            remove()
        }
    }, [])

    return (
        <>
            <Head key={'member-project-detail'}>
                <title>{`${project.name} - Sharing Knowledge`}</title>
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
