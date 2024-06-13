import { authorizeServerHeader, getAccessToken } from '@/lib/utils';
import { projectService } from '@/services/project.service';
import React from 'react'

const ProjectDetailPage = ({ user }: { user: any }) => {
    return (
        <div>{user}</div>
    )
}

export default ProjectDetailPage;


export async function getServerSideProps(context: any) {
    const accessToken = getAccessToken(context);
    try {
        authorizeServerHeader(accessToken);
        console.log(accessToken)
        console.log(context.params.id)
        const res = await projectService.findOne(context.params.id);
        console.log(res);
    } catch (error) {
        console.error(error);
    }

    return { props: { user: "hehe" } };

}