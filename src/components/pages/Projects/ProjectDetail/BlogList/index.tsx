import { useGetBlogList } from '@/hooks/query/blog.query'
import { IBlog } from '@/types/interfaces/Blog'
import React, { useEffect } from 'react'
import BlogItem from './BlogItem'
import { useInView } from "react-intersection-observer"
import { Skeleton } from '@/components/ui/skeleton'
import { useCurrentUserInfo } from '@/hooks/query'

const BlogList = () => {
    const { data, isFetching, hasNextPage, fetchNextPage } = useGetBlogList();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage])

    return (
        <div className='space-y-6'>
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
                    isFetching && <div className='flex flex-col gap-6'>
                        <Skeleton className='w-full aspect-[25/9] bg-accent dark:bg-border' />
                        <Skeleton className='w-full aspect-[25/9] bg-accent dark:bg-border' />
                        <Skeleton className='w-full aspect-[25/9] bg-accent dark:bg-border' />
                    </div>
                }
                {
                    !hasNextPage && <div className='text-center w-full my-2'>
                        <span className='dark:text-muted-foreground text-sm '>
                            You have read all blogs
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}

export default BlogList
