import { Button } from '@/components/ui/button';
import { AlignLeftIcon } from 'lucide-react';
import React from 'react'

const Sidebar: React.FC = () => {
    return (
        <Button variant={"ghost"} className="p-0 h-fit">
            <AlignLeftIcon className="w-5 h-5 stroke-[3]" />
        </Button>
    )
}

export default Sidebar;
