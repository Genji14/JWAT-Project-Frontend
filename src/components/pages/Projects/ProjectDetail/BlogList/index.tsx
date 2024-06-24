import StyledCard from '@/components/shared/StyledCard'
import { Button } from '@/components/ui/button'
import { useGetBlogList } from '@/hooks/query/blog.query'
import { IBlog } from '@/types/interfaces/Blog'
import React from 'react'
import BlogItem from './BlogItem'

const BlogList = () => {
    const { isFetching, isFetchingNextPage, data, hasNextPage, fetchNextPage } =
        useGetBlogList()
    return (
        <>
            {data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page.items?.map((blog: IBlog) => (
                        // <p key={blog.id}>{blog.title}</p>
                        <StyledCard key={blog.id} className='mb-10'>
                            <BlogItem blog={blog} />
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
