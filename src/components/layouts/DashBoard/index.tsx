import Header from '@/components/general/Header';
import SideBar from '@/components/general/Sidebar';
import { useExpandedStore } from '@/hooks/zustand';
import { cn } from '@/lib/utils';
import { FONT_POPPINS } from '@/lib/utils/constants/SettingSystem';
import React, { FC, PropsWithChildren } from 'react';

type IDashBoardLayoutProps = PropsWithChildren<{
    children: React.ReactNode
}>;

const DashBoardLayout: FC<IDashBoardLayoutProps> = ({ children }) => {
    const expanded = useExpandedStore((state) => state.expanded);

    return (
        <>
            <Header />
            <div className="w-full h-full flex">
                <SideBar />
                <main className={cn("flex-auto flex mt-[4.5rem] h-[calc(100vh-4.5rem)] flex-col transition-all bg-border dark:bg-border/20 p-8", FONT_POPPINS.className, expanded ? "ml-96" : "ml-header")}>
                    {children}
                </main>
            </div>

        </>
    );
}

export default DashBoardLayout;
