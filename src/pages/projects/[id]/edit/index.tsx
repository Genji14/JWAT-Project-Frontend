import ProjectDetailLayout from "@/components/layouts/ProjectDetail";
import EditProjectContainer from "@/components/pages/Projects/ProjectDetail/EditProject/EditProject/EditProjectContainer";
import { API_INSTANCE, authorizeSSR } from "@/lib/constants/ApiInstance";
import { PROJECT_ENDPOINTS } from "@/lib/constants/EndPoints";
import { ProjectDetailProvider } from "@/lib/contexts/ProjectDetailProject";
import { IProject } from "@/types/interfaces/Project";
import Head from "next/head";

const EditProjectPage = ({ project }: { project: IProject }) => {

    return (
        <>
            <Head>
                <title>{`Edit ${project.name} - Sharing Knowledge`}</title>
            </Head>
            <ProjectDetailProvider initialData={project}>
                <ProjectDetailLayout>
                    <EditProjectContainer />
                </ProjectDetailLayout>
            </ProjectDetailProvider>

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
export default EditProjectPage;
