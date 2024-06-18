import { projectService } from "@/services/project.service"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { toast } from "sonner"

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
    const { query } = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (userId: number) => {
            await projectService.inviteUser({
                project: Number(query.id as string),
                users: [userId]
            });
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
    const { query } = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await projectService.addDocument(Number(query.id as string), form);
        },
        onSuccess: () => {
            toast.success('Add new document successfully !!')
        },
    })

    return {
        mutateAddDocument: mutateAsync,
        isPendingAddDocument: isPending,
    }
}
