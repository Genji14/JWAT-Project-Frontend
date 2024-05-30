import { ICreateUserForm } from '@/types/interfaces'
import { BaseService } from './BaseService'
import { USER_ENDPOINTS } from '@/lib/constants/EndPoints'

class UserService extends BaseService {
    constructor() {
        super()
    }

    createUser = (form: ICreateUserForm) => {
        return this.post(USER_ENDPOINTS.CREATE_USER, form)
    }
}

export const userService = new UserService()
