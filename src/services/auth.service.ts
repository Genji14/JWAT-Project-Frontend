import { ISignInForm } from '@/types/interfaces/Form'
import { AUTH_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AppService } from './app.service'

class AuthService extends AppService {
    constructor() {
        super()
    }

    signIn = (userLogin: ISignInForm) => {
        return this.post(AUTH_ENDPOINTS.SIGN_IN, userLogin)
    }

    refreshToken = (refreshToken: string) => {
        return this.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
            refreshToken,
        })
    }
}

export const authService = new AuthService()
