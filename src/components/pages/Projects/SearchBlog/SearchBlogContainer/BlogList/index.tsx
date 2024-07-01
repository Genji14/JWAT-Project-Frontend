import { useGetBlogListSearch } from '@/hooks/query/blog.query'
import { IBlog } from '@/types/interfaces/Blog'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import BlogItem from '../../../ProjectDetail/BlogList/BlogItem'
import { Skeleton } from '@/components/ui/skeleton'

const BlogList = () => {
    const router = useRouter()
    const { data, isFetching, hasNextPage, fetchNextPage } =
        useGetBlogListSearch(router.query.text)
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage])

    return (
        <div className='space-y-6 mt-1'>
            <div className='text-2xl text-muted-foreground'>
                About <span className='text-foreground font-semibold'>{data?.pages[0].meta ? data?.pages[0].meta.totalItems : 0}{' '}</span>
                results
            </div>

            <div className='space-y-6'>
                {data?.pages.map((page, i) => (
                    <div className='space-y-6' key={i * 0.1}>
                        {page.items?.map((blog: IBlog, index: number) => (
                            <React.Fragment key={blog.id}>
                                {page.items.length === index + 1 ? (
                                    <BlogItem blog={blog} innerRef={ref} />
                                ) : (
                                    <BlogItem blog={blog} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
                <div>
                    {isFetching && (
                        <div className='flex flex-col gap-6'>
                            <Skeleton className='aspect-[25/9] w-full bg-accent dark:bg-border' />
                            <Skeleton className='aspect-[25/9] w-full bg-accent dark:bg-border' />
                            <Skeleton className='aspect-[25/9] w-full bg-accent dark:bg-border' />
                        </div>
                    )}
                    {!data && !hasNextPage && (
                        <div className='my-2 w-full text-center'>
                            <span className='text-sm dark:text-muted-foreground '>
                                You have read all blogs
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlogList
