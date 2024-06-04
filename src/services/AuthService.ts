import { IUserSignIn } from '@/types/interfaces'
import { BaseService } from './BaseService'
import { AUTH_ENDPOINTS } from '@/lib/constants/EndPoints'

class AuthService extends BaseService {
    constructor() {
        super()
    }

    signIn = (userLogin: IUserSignIn) => {
        return this.post(AUTH_ENDPOINTS.SIGN_IN, userLogin)
    }

    refreshToken = (refreshToken: string) => {
        return this.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
            refreshToken,
        })
    }
}

export const authService = new AuthService()
