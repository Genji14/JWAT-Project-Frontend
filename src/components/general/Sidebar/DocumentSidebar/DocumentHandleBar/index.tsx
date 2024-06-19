import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FilePlus, FileSearch, FolderPlusIcon, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Spinner from '@/components/shared/Spinner';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_TIME } from '@/lib/constants/SettingSystem';
import { useSearchDocument } from '@/hooks/query/project.query';
import { useStore } from '@/components/providers/StoreProvider';

const AddDocumentDialog = dynamic(() => import('./AddDocumentDialog'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
    ssr: false,
})

const AddDocumentGroupDialog = dynamic(() => import('./AddDocumentGroupDialog'), {
    loading: () => (
        <div className='p-10'>
            <Spinner />
        </div>
    ),
    ssr: false,
})


const DocumentHandleBar = () => {

    const [query, setQuery] = useState<string>("");

    const debounceQuery = useDebounce(query, DEBOUNCE_TIME);
    const setDocumentResults = useStore((state) => state.setDocumentResults);
    const clearDocumentResults = useStore((state) => state.clearDocumentResults);
    const { documentData } = useSearchDocument(debounceQuery);

    useEffect(() => {
        if (debounceQuery && documentData) {
            setDocumentResults(documentData);
        }
        if (!debounceQuery) {
            clearDocumentResults();
        }
    }, [documentData, debounceQuery]);

    return (
        <div className="w-full flex gap-1 items-center">
            <div className='w-full'>
                <Input
                    onChange={(evt) => setQuery(evt.target.value)}
                    icon={<FileSearch className="text-foreground/50 w-4 h-4" />}
                    placeholder='Search Document...'
                    className=" bg-accent/50 text-xs h-fit flex-auto dark:focus-visible:outline-none rounded dark:placeholder:text-foreground/50" />
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className='p-2 rounded'>
                        <Plus className='w-4 h-4' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align='end' className="mt-1 p-1 w-48">
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
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default DocumentHandleBar;