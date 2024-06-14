import DashboardLayout from "@/components/layouts/Dashboard";
import ProjectDetailLayout from "@/components/layouts/ProjectDetail";
import ProjectContainer from "@/components/pages/Projects/ProjectDetail/ProjectContainer";
import { API_INSTANCE, authorizeSSR } from "@/lib/constants/ApiInstance";
import { PROJECT_ENDPOINTS } from "@/lib/constants/EndPoints";
import Providers from "@/pages/providers";
import { IProject } from "@/types/interfaces/Project";
import Head from "next/head";
import { ReactElement } from "react";

const ProjectDetailPage = ({ project }: { project: IProject }) => {

    return (
        <>
            <Head>
                <title>{`${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectContainer project={project} />
        </>
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

ProjectDetailPage.getLayout = function getLayout(page: ReactElement) {
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

export default ProjectDetailPage;
