import DashboardLayout from '@/components/layouts/Dashboard'
import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { API_INSTANCE, authorizeSSR } from '@/lib/constants/ApiInstance'
import { PROJECT_ENDPOINTS } from '@/lib/constants/EndPoints'
import Providers from '@/pages/providers'
import { IProject } from '@/types/interfaces/Project'
import Image from 'next/image'
import Link from 'next/link'
import React, { ReactElement } from 'react'

const AboutProjectPage = ({ project }: { project: IProject }) => {
    return (
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
    )
}


export async function getServerSideProps({ req, params }: any) {
    try {
        const { id } = params;
        authorizeSSR(req);
        const res = await API_INSTANCE.get(PROJECT_ENDPOINTS.FIND_ONE(id));
        return { props: { project: res.data } };
    } catch (error) {
        console.error(error);
    }
    return { props: { project: null } };

}

AboutProjectPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Providers>
            <DashboardLayout>
                <ProjectDetailLayout>
                    {page}
                </ProjectDetailLayout>
            </DashboardLayout>
        </Providers>

    )
}

export default AboutProjectPage;
