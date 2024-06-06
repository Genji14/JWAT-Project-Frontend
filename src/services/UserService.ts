import { ICreateUserForm } from '@/types/interfaces'
import { BaseService } from './BaseService'
import { USER_ENDPOINTS } from '@/lib/constants/EndPoints'

class UserService extends BaseService {
    constructor() {
        super()
    }

    current = () => {
        return this.get(USER_ENDPOINTS.CURRENT);
    }

    createUser = (form: ICreateUserForm) => {
        return this.post(USER_ENDPOINTS.CREATE_USER, form)
    }

    updateProfile = (id: number, form: FormData) => {
        return this.patch(USER_ENDPOINTS.UPDATE_PROFILE(id), form)
    }
}

export const userService = new UserService()
