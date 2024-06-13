import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from './providers'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import DashboardLayout from '@/components/layouts/Dashboard'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ||
        ((page) => (
            <Providers>
                <DashboardLayout>{page}</DashboardLayout>
            </Providers>
        ))

    return getLayout(
        <Providers>
            <Component {...pageProps} />
        </Providers>
    )
}
