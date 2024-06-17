import { IChangePasswordForm, ICreateUserForm } from '@/types/interfaces/Form'
import { USER_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/enums'
import { IUserInfo } from '@/types/interfaces/User'
import { AppService } from './app.service'

class UserService extends AppService {
    constructor() {
        super()
    }

    current = (): Promise<AxiosResponse<IUserInfo>> => {
        return this.get(USER_ENDPOINTS.CURRENT)
    }

    getRole = (): Promise<AxiosResponse<UserRole>> => {
        return this.get(USER_ENDPOINTS.GET_ROLE)
    }

    findOne = (id: number): Promise<AxiosResponse<IUserInfo>> => {
        return this.get(USER_ENDPOINTS.FIND_ONE(id))

    }

    createUser = (form: ICreateUserForm) => {
        return this.post(USER_ENDPOINTS.CREATE_USER, form)
    }

    updateProfile = (form: FormData) => {
        return this.patch(USER_ENDPOINTS.UPDATE_PROFILE, form)
    }

    changePassword = (form: IChangePasswordForm) => {
        return this.patch(USER_ENDPOINTS.CHANGE_PASSWORD, form)
    }


}

export const userService = new UserService()
