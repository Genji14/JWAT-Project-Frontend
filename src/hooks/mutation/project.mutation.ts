import { projectService } from "@/services/project.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateProject = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await projectService.createProject(form)
        },
        onSuccess: () => {
            toast.success('Add Project successfully')
        },
    })

    return {
        mutateCreateProject: mutateAsync,
        isPendingCreateProject: isPending,
    }
}

