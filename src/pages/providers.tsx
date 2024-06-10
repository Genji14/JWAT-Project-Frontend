import { LIGHT_THEME } from '@/lib/constants/SettingSystem'
import React, { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
// import { AbilityContext } from '@/lib/contexts/CaslContext'
// import { createMongoAbility } from '@casl/ability'
// import { defineRulesFor } from '@/lib/utils'
// import { UserRole } from '@/types/enums'
import { ThemeProvider } from '@/components/shared/ThemeProvider'
import { StoreProvider } from '@/components/providers/StoreProvider'

type IProvidersProps = PropsWithChildren<{
    children: React.ReactNode
}>

const queryClient = new QueryClient()

const Providers: FC<IProvidersProps> = ({ children }) => {

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute='class' defaultTheme={LIGHT_THEME} enableSystem disableTransitionOnChange>
                <StoreProvider>
                    {children}
                    <Toaster richColors />
                </StoreProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default Providers
