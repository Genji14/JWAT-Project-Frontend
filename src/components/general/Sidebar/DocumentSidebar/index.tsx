import React, { useEffect } from 'react'
import DocumentHandleBar from './DocumentHandleBar';
import DocumentList from './DocumentList';
import { useGetDocument } from '@/hooks/query/project.query';
import { useStore } from '@/components/providers/StoreProvider';

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
        <div className="flex flex-col gap-2 w-full">
            <DocumentHandleBar />
            <DocumentList isFetching={isFetchingDocument} />
        </div>
    )
}

export default DocumentSidebar;