import { useStore } from '@/components/providers/StoreProvider';
import { File } from 'lucide-react';
import React from 'react'

const DocumentResultList = () => {

    const documentResults = useStore((state) => state.documentResults);

    return (
        <div>
            <div className="flex flex-col">
                {documentResults?.map((doc) => {
                    const fileUrl = `http://localhost:3001/api/project/document/file/${doc.url}`;
                    return (
                        <a key={doc.url} href={fileUrl} download={doc.name} className="flex gap-2 items-center text-muted-foreground hover:text-foreground hover:bg-border/50 dark:hover:bg-accent/50 py-1.5 px-1 rounded">
                            <File className="w-4 h-4" />
                            <span className='truncate w-3/4 text-xs flex-auto'>{doc.name}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    )
}

export default DocumentResultList