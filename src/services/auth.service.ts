import { ISignInForm } from '@/types/interfaces/Form'
import { AUTH_ENDPOINTS } from '@/lib/constants/EndPoints'
import API_INSTANCE from '@/lib/api'

class AuthService {

    signIn = (userLogin: ISignInForm) => {
        return API_INSTANCE.post(AUTH_ENDPOINTS.SIGN_IN, userLogin)
    }

    refreshToken = (refreshToken: string) => {
        return API_INSTANCE.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
            refreshToken,
        })
    }
}

export const authService = new AuthService()
