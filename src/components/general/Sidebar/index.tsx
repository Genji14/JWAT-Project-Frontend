import { useExpandedStore } from '@/hooks/zustand';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import image from "@/../public/CLT.jpg";

const SideBar = () => {

    const expanded = useExpandedStore((state) => state.expanded);

    return (
        <aside className={cn(" fixed h-[calc(100vh-4.5rem)] z-20 border-r-2 border-primary left-0 bottom-0 shadow-xl p-4 transition-all overflow-hidden", expanded && "w-96")}>
            <div className={cn(" flex items-center")}>
                <Image
                    className="w-10 h-10 object-cover"
                    src={image}
                    alt="Project Images"
                />
                <span className={cn("overflow-hidden ml-4 font-semibold transition-all", !expanded && "w-0 ml-0 -translate-x-5 opacity-0")}>CyberLogitech</span>
            </div>
        </aside >
    )
}

export default SideBar;
