import { useStore } from '@/components/providers/StoreProvider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ICreateDocumentGroupForm } from '@/types/interfaces/Form'
import React from 'react'
import DocumentResultList from '../../../DocumentResultList'
import DocumentRootNode from '../../../DocumentRootNode'

const EditDocumentsForm = () => {
    const documentResults = useStore((state) => state.documentResults)

    async function onSubmit(values: ICreateDocumentGroupForm) {
        // if (!!documentGroupForm.getValues('documents')?.length) {
        //     values = {
        //         ...values,
        //         documents: documentGroupForm.getValues('documents'),
        //     }
        // }
        // try {
        //     await mutateAddDocumentGroup(values)
        //     documentGroupForm.resetField('name')
        //     documentGroupForm.setValue('documents', [])
        // } catch (error) {
        //     console.error(error)
        // }
    }

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
