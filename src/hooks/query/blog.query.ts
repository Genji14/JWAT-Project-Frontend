import { BLOG_QUERY_KEY } from "@/lib/constants/QueryKey"
import { blogService } from "@/services/blog.service"
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

export const useGetStarOfBlog = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [BLOG_QUERY_KEY.GET_STAR_BLOG, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey
            const res = await blogService.getStarOfBlog(Number(id))
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        starData: data,
        isFetchingStar: isFetching,
    }
}

export const useGetCommentOfBlog = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [BLOG_QUERY_KEY.GET_COMMENT_BLOG, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey
            const res = await blogService.getCommentOfBlog(Number(id))
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        commentData: data,
        isFetchingComment: isFetching,
    }
}

export const useGetHashTagOfBlog = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [BLOG_QUERY_KEY.GET_HASHTAG_BLOG, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey
            const res = await blogService.getHashTagOfBlog(Number(id))
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        hashTagData: data,
        isFetchingHashTag: isFetching,
    }
}

export const useGetMediaOfBlog = (id: number) => {
    const { data, isFetching } = useQuery({
        queryKey: [BLOG_QUERY_KEY.GET_MEDIA_BLOG, id],
        queryFn: async ({ queryKey }) => {
            const [_key, id] = queryKey
            const res = await blogService.getMediaOfBlog(Number(id))
            return res.data
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
    })

    return {
        mediaData: data,
        isFetchingMedia: isFetching,
    }
}
