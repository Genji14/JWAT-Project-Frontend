import DashboardLayout from '@/components/layouts/Dashboard'
import ProjectDetailLayout from '@/components/layouts/ProjectDetail'
import Providers from '@/pages/providers'
import React, { ReactElement } from 'react'

const AboutProjectPage = () => {
    return (
        <div>AboutProjectPage</div>
    )
}

export default AboutProjectPage

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
