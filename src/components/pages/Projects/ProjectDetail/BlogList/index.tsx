import StyledCard from '@/components/shared/StyledCard'
import { Button } from '@/components/ui/button'
import { useGetBlogList } from '@/hooks/query/blog.query'
import React, { useEffect } from 'react'
import BlogItem from './BlogItem'

const BlogList = () => {
    const { isFetching, isFetchingNextPage, data, hasNextPage, fetchNextPage } =
        useGetBlogList()

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page.items?.map((blog: any) => (
                        // <p key={blog.id}>{blog.title}</p>
                        <StyledCard key={blog.id} className='mb-10'>
                            <BlogItem />
                        </StyledCard>
                    ))}
                </React.Fragment>
            ))}
            <div>
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                          ? 'Load More'
                          : 'Nothing more to load'}
                </Button>
            </div>
            <div>
                {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
            </div>
        </>
    )
}

export default BlogList
