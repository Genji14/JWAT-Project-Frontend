import { authService } from "@/services/AuthService"
import { IUserSignIn } from "@/types/interfaces"
import { useMutation } from "@tanstack/react-query"

export const useSignIn = () => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: IUserSignIn) => {
            await authService.signIn(form);
        },
        onSuccess() {

        },
        onError() {
            alert("Lỗi");
        }
    })

    return {
        mutateSignIn: mutateAsync,
        isPendingSignIn: isPending
    }
}