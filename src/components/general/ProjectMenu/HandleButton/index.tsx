import { Button } from '@/components/ui/button';
import { BookPlusIcon, FolderPen, UserRoundCogIcon } from 'lucide-react';
import React from 'react'

const HandleButton = () => {
    return (
        <div className="flex items-center gap-1">
            <Button variant={"ghost"} className="w-fit h-fit p-2">
                <UserRoundCogIcon className="w-5 h-5" />
            </Button>
            <Button variant={"ghost"} className="w-fit h-fit p-2">
                <FolderPen className="w-5 h-5" />
            </Button>
            <Button variant={"ghost"} className="w-fit h-fit p-2">
                <BookPlusIcon className="w-5 h-5" />
            </Button>
        </div>
    )
}

export default HandleButton;