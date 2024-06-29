import React from 'react'
import ProjectKnowledge from '../../ProjectDetail/ProjectKnowledge'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CircleArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BlogList from './BlogList'
import { useStore } from '@/components/providers/StoreProvider'

const SearchBlogContainer = () => {
    const router = useRouter()
    const connectSocket = useStore((state) => state.createSocket)
    connectSocket()
    return (
        <div className='relative'>
            <div className='absolute top-20'>
                <Link
                    href={`/projects/${router.query.id}`}
                    legacyBehavior
                    passHref
                >
                    <Button>
                        <CircleArrowLeft />
                    </Button>
                </Link>
            </div>
            <div className='mt-5 grid grid-cols-3 gap-4 lg:grid-cols-12'>
                <div className='col-span-3 flex w-full flex-col gap-2 lg:col-span-7 lg:col-start-2'>
                    <BlogList />
                </div>
                <div className='relative col-span-3 hidden w-full lg:col-start-10 lg:block'>
                    <div className='sticky top-40'>
                        <ProjectKnowledge knowledge={'hehe'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBlogContainer
