import { ThemeProvider } from '@/components/general/ThemeProvider'
import { LIGHT_THEME } from '@/lib/constants/SettingSystem'
import React, { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

type IProvidersProps = PropsWithChildren<{
    children: React.ReactNode
}>

const queryClient = new QueryClient()

const Providers: FC<IProvidersProps> = ({ children }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme={LIGHT_THEME}
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster richColors />
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default Providers
