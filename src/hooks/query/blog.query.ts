import { BLOG_QUERY_KEY } from "@/lib/constants/QueryKey";
import { blogService } from "@/services/blog.service";
import { useInfiniteQuery } from "@tanstack/react-query"

export const useGetBlogList = () => {
    const { data, status, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: [BLOG_QUERY_KEY.GET_BLOG_LIST],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await blogService.getBlogList(pageParam);
            return res.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.meta.currentPage + 1;
            return nextPage <= lastPage.meta.totalPages ? nextPage : undefined;
        },
        refetchOnWindowFocus: false
    });

    return { status, data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage }
}