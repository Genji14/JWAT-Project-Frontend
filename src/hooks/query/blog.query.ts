import { BLOG_QUERY_KEY } from "@/lib/constants/QueryKey";
import { blogService } from "@/services/blog.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useGetBlogList = () => {
    const { data, status, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: [BLOG_QUERY_KEY],
        queryFn: async () => {
            const res = await blogService.getBlogList();
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });

    return { status, data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage }
}