import Head from 'next/head'
import dynamic from 'next/dynamic'

const HandleBar = dynamic(
    () => import('@/components/pages/Dashboard/HandleBar'),
    { ssr: false }
)

export default function Home() {
    return (
        <>
            <Head key='home'>
                <title>Sharing Knowledge</title>
            </Head>
            <HandleBar />
        </>
    )
}
