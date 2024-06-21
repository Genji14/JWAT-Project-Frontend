import ProjectDetailLayout from "@/components/layouts/ProjectDetail";
import ProjectContainer from "@/components/pages/Projects/ProjectDetail/ProjectContainer";
import { API_INSTANCE, authorizeSSR } from "@/lib/constants/ApiInstance";
import { PROJECT_ENDPOINTS } from "@/lib/constants/EndPoints";
import { ProjectDetailProvider } from "@/lib/contexts/ProjectDetailProject";
import { IProject } from "@/types/interfaces/Project";
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

export const getServerSideProps = async ({ req, params }: any) => {
    try {
        const { id } = params as { id: number };
        authorizeSSR(req);
        const response = await API_INSTANCE.get(PROJECT_ENDPOINTS.FIND_ONE(id));
        return { props: { project: response.data } };
    } catch (error) {
        console.error(error);
        req.headers.cookies = "";
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            },
        };
    }
};

export default ProjectDetailPage;
