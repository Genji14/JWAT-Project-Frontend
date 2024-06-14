import DashboardLayout from "@/components/layouts/Dashboard";
import ProjectDetailLayout from "@/components/layouts/ProjectDetail";
import ProjectContainer from "@/components/pages/Projects/ProjectDetail/ProjectContainer";
import { useGetProjectDetail } from "@/hooks/query/project";
import { NextPageWithLayout } from "@/pages/_app";
import Providers from "@/pages/providers";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const ProjectDetailPage: NextPageWithLayout = () => {

    const { query } = useRouter();
    const { projectDetailData, isFetchingProjectDetail } = useGetProjectDetail(Number(query.id));

    return (
        <>
            <Head>
                <title>{projectDetailData ? projectDetailData.name + " - Sharing Knowledge" : "Sharing Knowledge"}</title>
            </Head>
            {
                projectDetailData && <ProjectContainer project={projectDetailData} isFetching={isFetchingProjectDetail} />
            }
        </>
    )
}

export default ProjectDetailPage;


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

// export async function getServerSideProps(context: any) {
//     const accessToken = getAccessToken(context);
//     context.req.headers["Authorization"] = `Bearer ${accessToken}`
//     const data = await serverService.getProjectDetail(context.params.id);
//     return { props: { project: data } };

// }