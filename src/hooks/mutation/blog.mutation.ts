import { BLOG_QUERY_KEY } from '@/lib/constants/QueryKey'
import { blogService } from '@/services/blog.service'
import { ICreateCommentForm } from '@/types/interfaces/Form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateBlog = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await blogService.createBlog(form)
        },
        onSuccess: () => {
            toast.success('Add Blog successfully!!')
        },
    })

    return {
        mutateCreateBlog: mutateAsync,
        isPendingCreateBlog: isPending,
    }
}

export const useSearchBlog = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (text: string) => {
            const result = await blogService.searchBlog(text)
            return result.data
        },
    })

    return {
        mutateSearchBlog: mutateAsync,
        isPendingSearchBlog: isPending,
    }
}

export const useDeleteBlog = () => {
    const queryClient = useQueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: number) => {
            await blogService.deleteBlog(id)
        },
        onSuccess: () => {
            toast.success('Delete Blog successfully!!')
            queryClient.invalidateQueries({
                queryKey: [BLOG_QUERY_KEY.GET_BLOG_LIST],
            })
        },
    })

    return {
        mutateDeleteBlog: mutateAsync,
        isPendingDeleteBlog: isPending,
    }
}

export const useCreateComment = (blogId: number) => {
    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: ICreateCommentForm) => {
            await blogService.createComment(form);
        },
        onSuccess: () => {
            toast.success('Send Comment successfully!!');
            queryClient.invalidateQueries({
                queryKey: [BLOG_QUERY_KEY.GET_COMMENT_BLOG, blogId]
            })
        },

    })
    return {
        mutateCreateComment: mutateAsync,
        isPendingCreateComment: isPending,
    }
}

export const useUpdateBlog = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ({
            blogId,
            form,
        }: {
            blogId: number
            form: FormData
        }) => {
            await blogService.updateBlog(blogId, form)
        },
        onSuccess: () => {
            toast.success('Update Blog successfully!!')
            queryClient.invalidateQueries({
                queryKey: [BLOG_QUERY_KEY.GET_BLOG_LIST],
            })
        }
    })

    return {
        mutateUpdateBlog: mutateAsync,
        isPendingUpdateBlog: isPending,
    }
}



