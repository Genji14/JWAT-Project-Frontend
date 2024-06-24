import { Button } from '@/components/ui/button';
import { useGetBlogList } from '@/hooks/query/blog.query';
import React, { useEffect } from 'react'

const BlogList = () => {
    const { isFetching, isFetchingNextPage, data, hasNextPage, fetchNextPage } = useGetBlogList();

    useEffect(() => {
        console.log(data)
    }, [data])

    return <>
        {/* {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
                {group.data.map((project) => (
                    <p key={project.id}>{project.name}</p>
                ))}
            </React.Fragment>
        ))} */}
        <div>
            <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
            </Button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
}

export default BlogList;