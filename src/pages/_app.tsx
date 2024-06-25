import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from './providers'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useCallback, useEffect } from 'react'
import DashboardLayout from '@/components/layouts/Dashboard'
import { Router } from 'next/router'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

    const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        Router.events.on("routeChangeComplete", resetWindowScrollPosition);

        return () => {
            Router.events.off("routeChangeComplete", resetWindowScrollPosition);
        };
    }, []);

    const getLayout =
        Component.getLayout ?? ((page) => (
            <Providers>
                <DashboardLayout>
                    {page}
                </DashboardLayout>
            </Providers>
        ))

    return getLayout(
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}
