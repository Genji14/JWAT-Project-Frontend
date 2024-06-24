import React, { useEffect } from 'react'
import DocumentHandleBar from './DocumentHandleBar'
import { useGetDocument } from '@/hooks/query/project.query'
import { useStore } from '@/components/providers/StoreProvider'
import DocumentRootNode from './DocumentRootNode'
import { ScrollArea } from '@/components/ui/scroll-area'
import DocumentResultList from './DocumentResultList'

const DocumentSidebar = () => {
    const { documentData, isFetchingDocument } = useGetDocument()
    const setDocumentRoot = useStore((state) => state.setDocumentRoot)
    const clearProjectData = useStore((state) => state.clearProjectData)
    const documentResults = useStore((state) => state.documentResults)

    useEffect(() => {
        if (documentData) {
            setDocumentRoot(documentData)
        }
        return () => {
            clearProjectData()
        }
    }, [documentData])

    return (
        <div className='flex h-full w-full flex-col gap-2'>
            <DocumentHandleBar />
            <ScrollArea className='flex-auto'>
                {documentResults ? (
                    <DocumentResultList />
                ) : (
                    <DocumentRootNode
                        isFetching={isFetchingDocument}
                        isInDialog={false}
                    />
                )}
            </ScrollArea>
        </div>
    )
}

export default DocumentSidebar
