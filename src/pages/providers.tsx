import { ThemeProvider } from '@/components/general/ThemeProvider';
import { LIGHT_THEME } from '@/lib/utils/constants/SettingSystem';
import React, { FC, PropsWithChildren } from 'react';

type IProvidersProps = PropsWithChildren<{
    children: React.ReactNode;
}>;

const Providers: FC<IProvidersProps> = ({ children }) => {
    return <>
        <ThemeProvider attribute="class" defaultTheme={LIGHT_THEME} enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
    </>;
};

export default Providers;
