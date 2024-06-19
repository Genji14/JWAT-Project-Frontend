import React, { useEffect } from 'react'
import DocumentHandleBar from './DocumentHandleBar';
import { useGetDocument } from '@/hooks/query/project.query';
import { useStore } from '@/components/providers/StoreProvider';
import DocumentRootNode from './DocumentRootNode';
import { ScrollArea } from '@/components/ui/scroll-area';

const DocumentSidebar = () => {

    const { documentData, isFetchingDocument } = useGetDocument();
    const setDocumentRoot = useStore((state) => state.setDocumentRoot);
    const clearProjectData = useStore((state) => state.clearProjectData);

    useEffect(() => {
        if (documentData) {
            setDocumentRoot(documentData);
        }
        return () => {
            clearProjectData();
        }
    }, [documentData])

    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <DocumentHandleBar />
            <ScrollArea className="flex-auto">
                <DocumentRootNode isFetching={isFetchingDocument} />
            </ScrollArea>
        </div>
    )
}

export default DocumentSidebar;