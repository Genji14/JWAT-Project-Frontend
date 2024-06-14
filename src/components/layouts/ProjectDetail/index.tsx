import React, { FC, PropsWithChildren } from 'react'
import { ProjectMenu } from '@/components/general/ProjectMenu'

type TProjectDetailLayout = PropsWithChildren<{}>

const ProjectDetailLayout: FC<TProjectDetailLayout> = ({ children }) => {

    return (
        <>
            <ProjectMenu />
            <section className="mt-16">{children}</section>
        </>
    )
}

export default ProjectDetailLayout
