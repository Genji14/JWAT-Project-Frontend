import StyledCard from '@/components/shared/StyledCard'
import React from 'react'
import KnowledgeList from './KnowledgeList'

type TProjectKnowledge = {
    knowledge: any
}

const ProjectKnowledge: React.FC<TProjectKnowledge> = () => {
    return (
        <StyledCard className='bg-background space-y-4 shadow-md p-2'>
            <h3 className="text-xl text-primary font-semibold text-center">TechStack</h3>
            <KnowledgeList />
        </StyledCard>
    )
}

export default ProjectKnowledge