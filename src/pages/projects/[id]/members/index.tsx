import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/interfaces/Project'
import { IUserInfo } from '@/types/interfaces/User'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MembersPage = ({
    project,
    // members,
}: {
    project: IProject
    // members: IUserInfo[]
}) => {
    return (
        <>
            <Head key={'member-project-detail'}>
                <title>{`Members of ${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <div className='flex flex-col justify-center gap-4'>
                        <h1>This is Members page</h1>
                    </div>
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
