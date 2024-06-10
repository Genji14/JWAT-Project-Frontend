import { IChangePasswordForm, ICreateUserForm } from '@/types/interfaces/Form';
import { BaseService } from './BaseService'
import { USER_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios';
import { UserRole } from '@/types/enums';

class UserService extends BaseService {
    constructor() {
        super()
    }

    current = () => {
        return this.get(USER_ENDPOINTS.CURRENT);
    }

    getRole = (): Promise<AxiosResponse<UserRole>> => {
        return this.get(USER_ENDPOINTS.GET_ROLE);
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
