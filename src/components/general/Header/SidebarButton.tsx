"use client"

import { Button } from '@/components/ui/button';
import { useExpandedStore } from '@/hooks/zustand';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React from 'react'

const SidebarButton = () => {

    const expanded = useExpandedStore((state) => state.expanded);
    const toggle = useExpandedStore((state) => state.toggle);

    return (
        <div className={cn("h-full transition-all justify-center flex p-4", expanded && "w-96")}>
            <Button onClick={toggle} variant={"outline"} className="p-2 w-fit h-fit">
                <Menu className="w-6 h-6" />
            </Button>
        </div>
    )
}

export default SidebarButton;
