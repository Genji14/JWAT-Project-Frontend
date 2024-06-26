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
            toast.success('Add Blog successfully!!');
        },
    })

    return {
        mutateCreateBlog: mutateAsync,
        isPendingCreateBlog: isPending,
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
