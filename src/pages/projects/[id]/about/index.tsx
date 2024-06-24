import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { setContext } from '@/lib/api'
import { ProjectDetailProvider } from '@/lib/contexts/ProjectDetailProject'
import { projectService } from '@/services/project.service'
import { IProject } from '@/types/interfaces/Project'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AboutProjectPage = ({ project }: { project: IProject }) => {
    return (
        <>
            <Head key={"about-project-detail"}>
                <title>{`About ${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <div className="flex flex-col gap-4 justify-center">
                        <AspectRatio ratio={5 / 1} className='rounded-lg overflow-hidden w-1/2 mx-auto'>
                            <Image fill src={project.media.url} alt={project.name} className='object-cover' />
                        </AspectRatio>
                        <div className='text-xl font-semibold uppercase text-center'>About <Link href={`/projects/${[project.id]}`} className="font-bold text-primary/80 hover:text-primary underline underline-offset-2">{project.name}</Link> Project</div>
                        <p className="container text-sm text-muted-foreground text-center">
                            {project.description && project.description.split('\n').map((line, index) => (
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
    setContext(context);
    const { id } = context.query;
    const res = await projectService.findOne(Number(id));
    return { props: { project: res.data } };
};


export default AboutProjectPage;
