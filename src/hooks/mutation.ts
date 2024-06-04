import { authService } from '@/services/AuthService'
import { userService } from '@/services/UserService'
import { ICreateUserForm, IUserSignIn } from '@/types/interfaces'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'

export const useSignIn = () => {
    const router = useRouter()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: IUserSignIn) => {
            const res = await authService.signIn(form)
            return res.data
        },
        onSuccess(data) {
            Cookies.set('accessToken', data.accessToken)
            Cookies.set('refreshToken', data.refreshToken)
            let decoded: any = jwtDecode<JwtPayload>(data.accessToken);
            Cookies.set('role', decoded.roles);
            router.push('/')
        },
    })

    return {
        mutateSignIn: mutateAsync,
        isPendingSignIn: isPending,
    }
}

export const useCreateUser = () => {
    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: async (form: ICreateUserForm) => {
            await userService.createUser(form)
        },
    })

    return {
        mutateCreateUser: mutateAsync,
        isPendingCreateUser: isPending,
        isSuccessCreateUser: isSuccess,
    }
}
