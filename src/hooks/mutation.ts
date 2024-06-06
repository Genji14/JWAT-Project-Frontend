import { USER_QUERY_KEY } from '@/lib/constants/QueryKey'
import { USER_RESPONSE_MESSAGE } from '@/lib/constants/RequestMessage'
import { authService } from '@/services/AuthService'
import { userService } from '@/services/UserService'
import { ICreateUserForm, IUserSignIn } from '@/types/interfaces'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


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
            let decoded: any = jwtDecode<JwtPayload>(data.accessToken)
            Cookies.set('role', decoded.role)
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

export const useUpdateProfile = () => {

    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: async (form: FormData) => {
            await userService.updateProfile(form);
        },
        onSuccess: () => {
            toast.success(USER_RESPONSE_MESSAGE.EDIT.SUCCESS);
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY.CURRENT] });
        }
    })

    return {
        mutateUpdateProfile: mutateAsync,
        isPendingUpdateProfile: isPending,
        isSuccessUpdateProfile: isSuccess,
    }
}