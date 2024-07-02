import { useStore } from '@/components/providers/StoreProvider'
import { File } from 'lucide-react'
import React from 'react'
import { SERVICE_NAME } from '@/lib/constants/SettingSystem'

const DocumentResultList = () => {
    const documentResults = useStore((state) => state.documentResults)

    return (
        <div>
            <div className='flex flex-col'>
                {documentResults?.map((doc) => {
                    const fileUrl = `${SERVICE_NAME}/api/project/document/file/${doc.url}`
                    return (
                        <a
                            key={doc.url}
                            href={fileUrl}
                            download={doc.name}
                            className='flex items-center gap-2 rounded px-1 py-1.5 text-muted-foreground hover:bg-border/50 hover:text-foreground dark:hover:bg-accent/50'
                        >
                            <File className='h-4 w-4' />
                            <span className='w-3/4 flex-auto truncate text-xs'>
                                {doc.name}
                            </span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default DocumentResultList
