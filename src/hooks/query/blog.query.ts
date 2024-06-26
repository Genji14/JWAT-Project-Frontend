import { BLOG_QUERY_KEY } from "@/lib/constants/QueryKey"
import { blogService } from "@/services/blog.service"
import { userService } from "@/services/user.service"
import { IBlogItemDetail } from "@/types/interfaces/Blog"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useGetBlogList = () => {
    const {
        data,
        status,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: [BLOG_QUERY_KEY.GET_BLOG_LIST],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await blogService.getBlogList(pageParam)
            return res.data
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.meta.currentPage + 1
            return nextPage <= lastPage.meta.totalPages ? nextPage : undefined
        },
        refetchOnWindowFocus: false,
    })

    return { status, data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage }
}

export const useGetBlogDetail = (blogId: number, userId: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [BLOG_QUERY_KEY.GET_BLOG_ITEM, blogId],
        queryFn: async () => {
            const [{ data: userInfoData }, { data: commentListData }, { data: starListData }, { data: hashTagListData }, { data: mediaListData }] = await Promise.all([
                userService.findOne(userId),
                blogService.getCommentOfBlog(blogId),
                blogService.getStarOfBlog(blogId),
                blogService.getHashTagOfBlog(blogId),
                blogService.getMediaOfBlog(blogId)

            ])
            const result: IBlogItemDetail = {
                userInfo: userInfoData,
                comments: commentListData,
                stars: starListData,
                hashTags: hashTagListData,
                media: mediaListData,
            }

            return result;
        },
        enabled: !!blogId && !!userId,
        refetchOnWindowFocus: false,
    });

    return {
        blogItemData: data,
        isFetchingBlogItem: isFetching
    }
}



export const useGetBlogComments = (blogId: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [BLOG_QUERY_KEY.GET_COMMENT_BLOG, blogId],
        queryFn: async () => {
            const { data } = await blogService.getCommentOfBlog(blogId);
            return data;
        },
        enabled: !!blogId,
        refetchOnWindowFocus: false,
    });

    return {
        commentsData: data,
        isFetchingComments: isFetching
    }
}
