import { IKnowledge } from '@/types/interfaces/Knowledge'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

const KnowledgeItem = ({ knowledge }: { knowledge: IKnowledge }) => {
    return (
        <div className='w-full flex gap-2 items-center'>
            <div className="w-12 h-12 rounded-md overflow-hidden">
                <Image src={knowledge.media.url} alt={knowledge.name} height={1000} width={1000} className='aspect-square w-full object-cover' />
            </div>
            <div className='flex-auto'>
                <h4 className="font-semibold">{knowledge.name}</h4>
                <h5 className='text-xs text-muted-foreground' >Created at: {format(knowledge.createdAt, "PPP")} </h5>
            </div>
        </div>
    )
}

export default KnowledgeItem;