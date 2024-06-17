import React from 'react'
import KnowledgeLoading from './KnowledgeLoading';
import KnowledgeItem from './KnowledgeItem';
import { useGetKnowledgeByProjectId } from '@/hooks/query/knowledge.query';

const KnowledgeList = () => {

    const { isFetchingKnowledgeList, knowledgeListData } = useGetKnowledgeByProjectId();

    return (
        <div className='px-3 pb-2'>
            <div className='flex flex-col gap-2'>
                {
                    !isFetchingKnowledgeList ? <>
                        {knowledgeListData?.map((knowledge) => {
                            return <KnowledgeItem key={knowledge.id} knowledge={knowledge} />
                        })}
                    </> : <KnowledgeLoading />
                }
            </div >

        </div >
    )
}

export default KnowledgeList