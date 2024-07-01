import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import ProjectContainer from '@/components/pages/Projects/ProjectDetail/ProjectContainer'
import { useStore } from '@/components/providers/StoreProvider'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/interfaces/Project'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

const ProjectDetailPage = ({ project }: { project: IProject }) => {
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
            <Head>
                <title>{`${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <ProjectContainer />
                </ProjectDetailLayout>
            </ProjectDetailProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    setContext(context)
    const { id } = context.query
    const res = await projectService.findOne(Number(id))
    return { props: { project: res.data } }
}

export default ProjectDetailPage
