import React from 'react'
import KnowledgeLoading from './KnowledgeLoading';
import KnowledgeItem from './KnowledgeItem';
import { useGetKnowledgeByProjectId } from '@/hooks/query/knowledge.query';
import { BookXIcon } from 'lucide-react';

const KnowledgeList = () => {

    const { isFetchingKnowledgeList, knowledgeListData } = useGetKnowledgeByProjectId();

    return (
        <div className='px-3 pb-2'>
            <div className='flex flex-col gap-2'>
                {
                    !isFetchingKnowledgeList ? <>
                        {
                            !!knowledgeListData?.length ? knowledgeListData?.map((knowledge) => {
                                return <KnowledgeItem key={knowledge.id} knowledge={knowledge} />
                            }) :
                                <div className="my-2 text-muted-foreground gap-1 flex flex-col items-center justify-center">
                                    <BookXIcon />
                                    <span className='text-sm text-center'>No knowledge avaiable !!</span>
                                </div>
                        }
                    </> : <KnowledgeLoading />
                }
            </div >

        </div >
    )
}

export default KnowledgeList