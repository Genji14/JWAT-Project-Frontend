
import { Input } from '@/components/ui/input';
import { FileSearch } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_TIME } from '@/lib/constants/SettingSystem';
import { useSearchDocument } from '@/hooks/query/project.query';
import { useStore } from '@/components/providers/StoreProvider';
import { Can, useAbility } from '@/components/providers/AbilityProvider';

const DocumentActionButton = dynamic(() => import('./DocumentActionButton'), {
    ssr: false
});

const DocumentHandleBar = () => {

    const [query, setQuery] = useState<string>("");

    const ability = useAbility();
    const debounceQuery = useDebounce(query, DEBOUNCE_TIME);
    const { documentData } = useSearchDocument(debounceQuery);

    const setDocumentResults = useStore((state) => state.setDocumentResults);
    const clearDocumentResults = useStore((state) => state.clearDocumentResults);


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
            <Can I="manage" a="Document" ability={ability}>
                <DocumentActionButton />
            </Can>
        </div>
    )
}

export default DocumentHandleBar;