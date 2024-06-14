import { LIGHT_THEME } from '@/lib/constants/SettingSystem'
import React, { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { StoreProvider } from '@/components/providers/StoreProvider'
import { AbilityProvider } from '@/components/providers/AbilityProvider'
import { TooltipProvider } from '@/components/ui/tooltip'

type IProvidersProps = PropsWithChildren<{
    children: React.ReactNode
}>

const queryClient = new QueryClient()

const Providers: FC<IProvidersProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <StoreProvider>
                <AbilityProvider>
                    <ThemeProvider attribute='class' defaultTheme={LIGHT_THEME} enableSystem disableTransitionOnChange>
                        <TooltipProvider>
                            {children}
                            <Toaster richColors />
                        </TooltipProvider>
                    </ThemeProvider>
                </AbilityProvider>
            </StoreProvider>

        </QueryClientProvider>
    )
}

export default Providers
