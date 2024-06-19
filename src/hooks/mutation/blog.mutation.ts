import { blogService } from '@/services/blog.service'
import { useMutation } from '@tanstack/react-query'
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
