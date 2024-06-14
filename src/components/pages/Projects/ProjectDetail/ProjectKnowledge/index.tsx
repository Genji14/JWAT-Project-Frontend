import StyledCard from '@/components/shared/StyledCard'
import React from 'react'

type TProjectKnowledge = {
    knowledge: any
}

const ProjectKnowledge: React.FC<TProjectKnowledge> = ({ knowledge }) => {
    return (
        <StyledCard className='bg-background space-y-4 shadow-md p-2'>
            <h3 className="text-lg text-primary font-semibold text-center">TechStack</h3>
        </StyledCard>
    )
}

export default ProjectKnowledge