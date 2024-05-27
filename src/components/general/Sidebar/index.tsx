import { useExpandedStore } from '@/hooks/zustand';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import image from "@/../public/CLT.jpg";

const SideBar = () => {

    const expanded = useExpandedStore((state) => state.expanded);

    return (
        <aside className={cn("w-96 fixed h-[calc(100vh-4.5rem)] z-20 border-r left-0 bottom-0 shadow-xl p-4 transition-all overflow-hidden", !expanded && "w-fit")}>
            <div className={cn(" flex items-center transition-all",)}>
                <Image
                    className="w-10 h-10 object-cover"
                    src={image}
                    alt="Project Images"
                />
                <span className={cn("overflow-hidden ml-2 font-semibold", !expanded && "w-0 ml-0")}>CyberLogitech</span>
            </div>
        </aside >
    )
}

export default SideBar;
