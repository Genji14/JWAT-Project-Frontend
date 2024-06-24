import StyledCard from '@/components/shared/StyledCard'
import { Button } from '@/components/ui/button'
import { useGetBlogList } from '@/hooks/query/blog.query'
import React, { useEffect } from 'react'
import BlogItem from './BlogItem'
import { IBlog } from '@/types/interfaces/Blog'

const BlogList = () => {
    const { isFetching, isFetchingNextPage, data, hasNextPage, fetchNextPage } =
        useGetBlogList()

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            {data?.pages.map((page, i) => (
                <div key={i} className="space-y-4">
                    {page.items?.map((blog: IBlog) => (
                        <StyledCard key={blog.id}>
                            <BlogItem />
                        </StyledCard>
                    ))}
                </div>
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
