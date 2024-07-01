import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import { useStore } from '@/components/providers/StoreProvider'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/interfaces/Project'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const AboutProjectPage = ({ project }: { project: IProject }) => {
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
            <Head key={'about-project-detail'}>
                <title>{`About ${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <div className='flex flex-col justify-center gap-4'>
                        <AspectRatio
                            ratio={5 / 1}
                            className='mx-auto w-1/2 overflow-hidden rounded-lg'
                        >
                            <Image
                                fill
                                src={project.media.url}
                                alt={project.name}
                                className='object-cover'
                            />
                        </AspectRatio>
                        <div className='text-center text-xl font-semibold uppercase'>
                            About{' '}
                            <Link
                                href={`/projects/${[project.id]}`}
                                className='font-bold text-primary/80 underline underline-offset-2 hover:text-primary'
                            >
                                {project.name}
                            </Link>{' '}
                            Project
                        </div>
                        <p className='container text-center text-sm text-muted-foreground'>
                            {project.description &&
                                project.description
                                    .split('\n')
                                    .map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                        </p>
                    </div>
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

export default AboutProjectPage
