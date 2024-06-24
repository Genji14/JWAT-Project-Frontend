import { IKnowledge } from '@/types/interfaces/Knowledge'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'
import RemoveKnowledgeDialog from './RemoveKnowledgeDialog/RemoveKnowledgeDialog'

const KnowledgeItem = ({ knowledge }: { knowledge: IKnowledge }) => {
    return (
        <div className='flex w-full items-center gap-2'>
            <div className='h-12 w-12 overflow-hidden rounded-md'>
                <Image
                    src={knowledge.media.url}
                    alt={knowledge.name}
                    height={500}
                    width={500}
                    className='aspect-square w-full object-cover'
                />
            </div>
            <div className='flex-auto'>
                <h4 className='font-semibold'>{knowledge.name}</h4>
                <h5 className='text-xs text-muted-foreground'>
                    Created at: {format(knowledge.createdAt, 'PPP')}{' '}
                </h5>
            </div>
            <RemoveKnowledgeDialog knowledge={knowledge} />
        </div>
    )
}

export default KnowledgeItem
