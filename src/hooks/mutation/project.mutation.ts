import { PROJECT_QUERY_KEY } from '@/lib/constants/QueryKey'
import { projectService } from '@/services/project.service'
import { TUngroupDocument } from '@/types'
import { ICreateDocumentGroupForm, IProjectForm } from '@/types/interfaces/Form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

export const useCreateProject = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await projectService.createProject(form)
        },
        onSuccess: () => {
            toast.success('Add Project successfully !!')
        },
    })

    return {
        mutateCreateProject: mutateAsync,
        isPendingCreateProject: isPending,
    }
}

export const useInviteUser = () => {
    const { query } = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (userId: number) => {
            await projectService.inviteUser({
                project: Number(query.id as string),
                users: [userId],
            })
        },
        onSuccess: () => {
            toast.success('Invite user successfully !!')
        },
    })

    return {
        mutateInviteUser: mutateAsync,
        isPendingInviteUser: isPending,
    }
}

export const useAddDocument = () => {
    const { query } = useRouter()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await projectService.addDocument(Number(query.id as string), form)
        },
        onSuccess: () => {
            toast.success('Add new document successfully !!')
            queryClient.invalidateQueries({
                queryKey: [
                    PROJECT_QUERY_KEY.GET_PROJECT_ROOT_DOCUMENT,
                    Number(query.id),
                ],
            })
        },
    })

    return {
        mutateAddDocument: mutateAsync,
        isPendingAddDocument: isPending,
    }
}

export const useRemoveDocument = () => {
    const { query } = useRouter()
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (id: number) => {
            await projectService.removeDocument(id)
        },
        onSuccess: () => {
            toast.success('Removes document successfully !!')
            queryClient.invalidateQueries({
                queryKey: [
                    PROJECT_QUERY_KEY.GET_PROJECT_ROOT_DOCUMENT,
                    Number(query.id),
                ],
            })
        },
    })

    return {
        mutateRemoveDocument: mutateAsync,
        isPendingRemoveDocument: isPending,
    }
}

export const useAddDocumentGroup = () => {
    const queryClient = useQueryClient()
    const { query } = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: ICreateDocumentGroupForm) => {
            await projectService.addDocumentGroup(form)
        },
        onSuccess: () => {
            toast.success('Add new document group successfully !!')
            queryClient.invalidateQueries({
                queryKey: [
                    PROJECT_QUERY_KEY.GET_PROJECT_ROOT_DOCUMENT,
                    Number(query.id),
                ],
            })
        },
    })
    return {
        mutateAddDocumentGroup: mutateAsync,
        isPendingAddDocumentGroup: isPending,
    }
}

export const useUngroupDocumentGroup = () => {
    const queryClient = useQueryClient()
    const { query } = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async ({
            docsId,
            groupId,
        }: {
            docsId: number[]
            groupId: number
        }) => {
            const req: TUngroupDocument = {
                documents: docsId,
                project: Number(query.id),
            }
            await projectService.ungroupDocument(req)
            await projectService.deleteGroup(groupId)
        },
        onSuccess: () => {
            toast.success('Ungroup successfully !!')
            queryClient.invalidateQueries({
                queryKey: [
                    PROJECT_QUERY_KEY.GET_PROJECT_ROOT_DOCUMENT,
                    Number(query.id),
                ],
            })
        },
    })
    return {
        mutateUnGroup: mutateAsync,
        isPendingUnGroup: isPending,
    }
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient()
    const { query } = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: IProjectForm) => {
            await projectService.updateProject(Number(query.id), form)
        },
        onSuccess: () => {
            toast.success('Update project successfully!')
            queryClient.invalidateQueries({
                queryKey: [PROJECT_QUERY_KEY.FIND_ONE],
            })
        },
    })

    return {
        mutateUpdateProject: mutateAsync,
        isPendingUpdateProject: isPending,
    }
}
