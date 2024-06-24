import ProjectDetailLayout from "@/components/layouts/ProjectDetail";
import ProjectContainer from "@/components/pages/Projects/ProjectDetail/ProjectContainer";
import { setContext } from "@/lib/api";
import { ProjectDetailProvider } from "@/lib/contexts/ProjectDetailProject";
import { projectService } from "@/services/project.service";
import { IProject } from "@/types/interfaces/Project";
import { GetServerSideProps } from "next";
import Head from "next/head";

const ProjectDetailPage = ({ project }: { project: IProject }) => {

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
    setContext(context);
    const { id } = context.query;
    const res = await projectService.findOne(Number(id));
    return { props: { project: res.data } };
};

export default ProjectDetailPage;
