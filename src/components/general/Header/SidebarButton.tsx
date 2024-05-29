"use client"

import { Button } from '@/components/ui/button';
import { useExpandedStore } from '@/hooks/zustand';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import React from 'react'

const SidebarButton = () => {

    const toggle = useExpandedStore((state) => state.toggle);

    return (
        <div className={cn("h-full transition-all justify-center flex p-4")}>
            <Button onClick={toggle} variant={"ghost"} className="p-2 w-fit h-fit">
                <Menu className="w-6 h-6" />
            </Button>
        </div>
    )
}

export default SidebarButton;
