import { useStore } from '@/components/providers/StoreProvider';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import React from 'react'

const KnowledgeForm = dynamic(() => import('./AddKnowledgeForm/index'), {
    ssr: false
});

const AddKnowledgeSection = () => {

    const isAddingMode = useStore(state => state.isAddingMode);
    const toggleAdding = useStore(state => state.toggleAdding)

    return (
        <div className="flex flex-col gap-4">
            <div className='flex items-center justify-between'>
                <h3 className="font-semibold text-lg">{isAddingMode ? "Add New Knowledge" : "Tech Stacks"}</h3>
                {!isAddingMode && <Button onClick={toggleAdding}>Add new</Button>}
            </div>
            {isAddingMode && <KnowledgeForm />}
        </div>
    )
}

export default AddKnowledgeSection;