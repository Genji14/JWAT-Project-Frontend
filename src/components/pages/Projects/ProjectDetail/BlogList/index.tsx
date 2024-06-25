import StyledCard from '@/components/shared/StyledCard'
import { Button } from '@/components/ui/button'
import { useGetBlogList } from '@/hooks/query/blog.query'
import { IBlog } from '@/types/interfaces/Blog'
import React, { useEffect } from 'react'
import BlogItem from './BlogItem'
import { useInView } from "react-intersection-observer"
import { Skeleton } from '@/components/ui/skeleton'

const BlogList = () => {
    const { isFetching, isFetchingNextPage, data, hasNextPage, fetchNextPage } = useGetBlogList();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage])

    return (
        <>
            {data?.pages.map((page, i) => (
                <div className='space-y-6' key={i}>
                    {page.items?.map((blog: IBlog, index: number) => (
                        <React.Fragment key={blog.id}>
                            {
                                page.items.length === index + 1
                                    ? <BlogItem blog={blog} innerRef={ref} />
                                    : <BlogItem blog={blog} />
                            }
                        </React.Fragment>
                    ))}
                </div>
            ))}
            <div>
                {
                    isFetching && !isFetchingNextPage ? <div className='flex flex-col gap-6'>
                        <Skeleton className='w-full aspect-[25/9] bg-border' />
                        <Skeleton className='w-full aspect-[25/9] bg-border' />
                        <Skeleton className='w-full aspect-[25/9] bg-border' />
                    </div> : <div className='text-center w-full my-2'>
                        <span className='dark:text-muted-foreground text-sm '>
                            You have read all blogs
                        </span>
                    </div>
                }
            </div>
        </>
    )
}

export default BlogList
