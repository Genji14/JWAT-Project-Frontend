import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FilePlus, FolderCog, FolderPlusIcon, WrenchIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Spinner from '@/components/shared/Spinner'

const AddDocumentDialog = dynamic(() => import('../AddDocumentDialog'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
    ssr: false,
})

const AddDocumentGroupDialog = dynamic(
    () => import('../AddDocumentGroupDialog'),
    {
        loading: () => (
            <div className='p-10'>
                <Spinner />
            </div>
        ),
        ssr: false,
    }
)

const EditDocumentsDialog = dynamic(() => import('../EditDocuments'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
    ssr: false,
})

const DocumentActionButton = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='rounded p-2'>
                    <WrenchIcon className='h-4 w-4' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='mt-1 w-48 p-1'>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                            <FilePlus className='h-4 w-4' />
                            <span className='text-xs'>Add Document</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent
                        styledCard={true}
                        className='p-6 lg:w-1/3'
                        onInteractOutside={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <AddDocumentDialog />
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                            <FolderPlusIcon className='h-4 w-4' />
                            <span className='text-xs'>Add Document Group </span>
                        </div>
                    </DialogTrigger>
                    <DialogContent
                        styledCard={true}
                        className='p-6 lg:w-1/3'
                        onInteractOutside={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <AddDocumentGroupDialog />
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex cursor-pointer items-center gap-2 rounded px-3 py-1.5 text-sm font-semibold hover:bg-accent'>
                            <FolderCog className='h-4 w-4' />
                            <span className='text-xs'>Edit documents</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent
                        styledCard={true}
                        className='p-6 lg:w-1/3'
                        onInteractOutside={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <EditDocumentsDialog />
                    </DialogContent>
                </Dialog>
            </PopoverContent>
        </Popover>
    )
}

export default DocumentActionButton
