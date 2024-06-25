import { useStore } from '@/components/providers/StoreProvider'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import DocumentResultList from '../../../DocumentResultList'
import DocumentRootNode from '../../../DocumentRootNode'

const EditDocumentsForm = () => {
    const documentResults = useStore((state) => state.documentResults)
    return (
        <ScrollArea className='flex-auto'>
            {documentResults ? (
                <DocumentResultList />
            ) : (
                <DocumentRootNode isFetching={false} isInDialog={true} />
            )}
        </ScrollArea>
    )
}

export default EditDocumentsForm
