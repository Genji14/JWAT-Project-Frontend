import { ThemeProvider } from '@/components/general/ThemeProvider';
import { LIGHT_THEME } from '@/lib/utils/constants/SettingSystem';
import React, { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type IProvidersProps = PropsWithChildren<{
    children: React.ReactNode;
}>;

const queryClient = new QueryClient()


const Providers: FC<IProvidersProps> = ({ children }) => {
    return <>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme={LIGHT_THEME} enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    </>;
};

export default Providers;
