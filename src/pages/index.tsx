import Head from 'next/head'
import dynamic from 'next/dynamic'
import ProjectLoader from '@/components/pages/Dashboard/ProjectLoader'
import { SearchProjectProvider } from '@/lib/contexts/SearchProjectContext'

const HandleBar = dynamic(
    () => import('@/components/pages/Dashboard/HandleBar'),
    { ssr: false }
)

const ProjectList = dynamic(
    () => import('@/components/pages/Dashboard/ProjectList'),
    {
        ssr: false,
        loading: () => (
            <div className='my-4'>
                <ProjectLoader />
            </div>
        ),
    }
)

export default function Dasshboard() {
    return (
        <>
            <Head key='home'>
                <title>Sharing Knowledge</title>
            </Head>
            <SearchProjectProvider>
                <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-bold uppercase'>My projects</h2>
                    <HandleBar />
                </div>
                <div className='my-4'>
                    <ProjectList />
                </div>
            </SearchProjectProvider>

        </>
    )
}
