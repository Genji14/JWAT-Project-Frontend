import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
import { toast } from 'sonner';

const KnowledgeForm = dynamic(() => import('./AddKnowledgeForm/index'), {
    ssr: false
});

const AddKnowledgeSection = () => {

    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            <div className='flex items-center justify-between'>
                <h3 className="font-bold text-lg uppercase">Tech Stacks</h3>
                {!isAdding && <Button onClick={() => setIsAdding(true)}>Add new</Button>}
            </div>
            {isAdding && <KnowledgeForm setIsAdding={setIsAdding} />}
        </div>
    )
}

export default AddKnowledgeSection;