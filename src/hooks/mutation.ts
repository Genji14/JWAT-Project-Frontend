import { authService } from '@/services/AuthService'
import { IUserSignIn } from '@/types/interfaces'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useSignIn = () => {

    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: IUserSignIn) => {
            const res = await authService.signIn(form);
            return res.data;
        },
        onSuccess(data) {
            Cookies.set('accessToken', data.accessToken);
            Cookies.set('refreshToken', data.refreshToken);
            router.push("/")
        },
        onError() {
            toast.error("Lỗi");
        },
    })

    return {
        mutateSignIn: mutateAsync,
        isPendingSignIn: isPending,
    }
}
