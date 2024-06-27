import { useStore } from '@/components/providers/StoreProvider'
import { USER_QUERY_KEY } from '@/lib/constants/QueryKey'
import { USER_RESPONSE_MESSAGE } from '@/lib/constants/RequestMessage'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { UserRole } from '@/types/enums'

import {
    IChangePasswordForm,
    ICreateUserForm,
    ISignInForm,
} from '@/types/interfaces/Form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Auth

export const useSignIn = () => {
    const router = useRouter()
    const setRole = useStore((state) => state.setRole);


    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: ISignInForm) => {
            const { data } = await authService.signIn(form)
            Cookies.set('accessToken', data.accessToken)
            Cookies.set('refreshToken', data.refreshToken)
            const { data: role } = await userService.getRole()
            setRole(role);
            return role;
        },
        onSuccess: (data) => {
            if (data === UserRole.ADMIN)
                router.push('/admin/dashboard');
            else
                router.push("/")
        },
    })

    return {
        mutateSignIn: mutateAsync,
        isPendingSignIn: isPending,
    }
}

// User

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
    const queryClient = useQueryClient()

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (form: FormData) => {
            await userService.updateProfile(form)
        },
        onSuccess: () => {
            toast.success(USER_RESPONSE_MESSAGE.EDIT.SUCCESS)
            queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEY.CURRENT],
            })
        },
    })

    return {
        mutateUpdateProfile: mutateAsync,
        isPendingUpdateProfile: isPending,
    }
}

export const useChangePassword = () => {
    const { mutateAsync, isPending, isSuccess } = useMutation({
        mutationFn: async (form: IChangePasswordForm) => {
            await userService.changePassword(form)
        },
        onSuccess: () => {
            toast.success(USER_RESPONSE_MESSAGE.EDIT.PASSWORD_SUCCESS)
        },
    })

    return {
        mutateChangePassword: mutateAsync,
        isPendingChangePassword: isPending,
        isSuccessChangePassword: isSuccess,
    }
}

