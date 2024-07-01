import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import MembersComtainer from '@/components/pages/Projects/ProjectDetail/MembersContainer'
import { useStore } from '@/components/providers/StoreProvider'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/interfaces/Project'
import { IUserInfo } from '@/types/interfaces/User'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react'

const MembersPage = ({
    project,
    members,
}: {
    project: IProject
    members: IUserInfo[]
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
                <title>{`Members of ${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <MembersComtainer members={members} />
                </ProjectDetailLayout>
            </ProjectDetailProvider>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    setContext(context)
    const { id } = context.query
    const project = await projectService.findOne(Number(id))
    const members = await projectService.searchUsersInProject(Number(id))
    return { props: { project: project.data, members: members.data } }
}

export default MembersPage
