import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import KnowledgeLoading from './KnowledgeLoading';
import KnowledgeItem from './KnowledgeItem';
import { IKnowledge } from '@/types/interfaces/Knowledge';

const KnowledgeList = ({ data, isFetching }: { data: IKnowledge[] | undefined, isFetching: boolean }) => {

    return (
        <ScrollArea className='max-h-56'>
            <div className='flex flex-col gap-2'>
                {
                    !isFetching ? <>
                        {data?.map((knowledge) => {
                            return <KnowledgeItem key={knowledge.id} knowledge={knowledge} />
                        })}
                    </> : <KnowledgeLoading />
                }
            </div>

        </ScrollArea>
    )
}

export default KnowledgeList