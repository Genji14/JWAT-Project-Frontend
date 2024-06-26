import { KNOWLEDGE_QUERY_KEY } from '@/lib/constants/QueryKey'
import { knowledgeService } from '@/services/knowledge.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateKnowledge = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await knowledgeService.createKnowledge(form)
        },
        onSuccess: () => {
            toast.success('Add Knowledge Successfully')
            queryClient.invalidateQueries({
                queryKey: [KNOWLEDGE_QUERY_KEY.GET_KNOWLEDGES_BY_PROJECT],
            })
        },
    })

    return {
        mutateCreateKnowledge: mutateAsync,
        isPendingCreateKnowledge: isPending,
    }
}

export const useRemoveKnowledge = () => {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: number) => {
            await knowledgeService.deleteKnowledge(id)
        },
        onSuccess: () => {
            toast.success('Removes knowledge successfully !!')
            queryClient.invalidateQueries({
                queryKey: [KNOWLEDGE_QUERY_KEY.GET_KNOWLEDGES_BY_PROJECT],
            })
        },
    })

    return {
        mutateRemoveKnowledge: mutateAsync,
        isPendingRemoveKnowledge: isPending,
    }
}
