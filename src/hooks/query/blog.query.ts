import { BLOG_QUERY_KEY } from "@/lib/constants/QueryKey";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query"

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

// export const getGetBlogDetail = (blogId: number, userId: number) => {
//     const { data, isFetching } = useQuery({
//         queryKey: [BLOG_QUERY_KEY.GET_BLOG_ITEM, blogId],
//         queryFn: async () => {
//             const [{data: comments}, {}] = await Promise.all([
//                 userService.findOne(userId),
//                 blogService.
//             ])
//         }
//     })
// }