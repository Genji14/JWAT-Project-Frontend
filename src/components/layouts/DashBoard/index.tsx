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
            <div className="w-full">
                <SideBar />
                <main className={cn("flex min-h-screen flex-col items-center justify-between p-24 transition-all", FONT_POPPINS.className, expanded ? "ml-96" : "ml-[4.5rem]")}>
                    {children}
                </main>
            </div>

        </>
    );
}

export default DashBoardLayout;
