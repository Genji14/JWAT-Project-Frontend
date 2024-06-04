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

    const rules = defineRulesFor('ADMIN');
    const ability = new Ability(rules)

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme={LIGHT_THEME}
                    enableSystem
                    disableTransitionOnChange
                >
                    <AbilityContext.Provider value={ability}>
                        {children}
                    </AbilityContext.Provider>

                    <Toaster richColors />
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}

export default Providers
