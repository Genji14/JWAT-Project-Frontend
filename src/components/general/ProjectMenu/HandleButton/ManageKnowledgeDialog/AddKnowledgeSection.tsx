import { Button } from '@/components/ui/button';
import { BookPlusIcon } from 'lucide-react';
import React, { useState } from 'react'
import KnowledgeForm from './KnowledgeForm';
import { toast } from 'sonner';

const AddKnowledgeSection = () => {

    const [isAdding, setIsAdding] = useState(false);

    const handleAddingProject = () => {
        if (!isAdding) {
            setIsAdding(true);
        } else {
            toast("You are in adding knowledge mode.")
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {isAdding && <KnowledgeForm setIsAdding={setIsAdding} />}
            <Button onClick={handleAddingProject} variant={"outline"} className="p-5 border-dashed border-muted-foreground/50 border-2 hover:border-2 text-muted-foreground/50 hover:border-primary hover:text-primary hover:bg-border/50">
                <BookPlusIcon className="w-5 h-5 mr-2" />
                <span className='text-base'>Create New Knowledge</span>
            </Button>
        </div>
    )
}

export default AddKnowledgeSection;