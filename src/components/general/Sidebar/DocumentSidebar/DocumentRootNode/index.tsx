import { useStore } from '@/components/providers/StoreProvider'
import Spinner from '@/components/shared/Spinner'
import React from 'react'
import DocumentNode from './DocumentNode'

const DocumentRootNode = ({
    isFetching,
    isInDialog,
}: {
    isFetching: boolean
    isInDialog: boolean
}) => {
    const documentRoot = useStore((state) => state.documentRoot)

    return (
        <>
            {isFetching ? (
                <Spinner />
            ) : (
                <div className='flex flex-col gap-1'>
                    {documentRoot && (
                        <DocumentNode
                            node={documentRoot}
                            isRoot={true}
                            isInDialog={isInDialog}
                        />
                    )}
                </div>
            )}
        </>
    )
}

export default DocumentRootNode
