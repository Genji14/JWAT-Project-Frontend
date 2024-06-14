import { useRededirect } from '@/hooks/useRedirect'
import { NextPage } from 'next'
import React from 'react'

const ProjectsPage: NextPage = () => {
    useRededirect("/");
    return <></>
}

export default ProjectsPage;
