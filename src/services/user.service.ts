import { IChangePasswordForm, ICreateUserForm } from '@/types/interfaces/Form'
import { USER_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios'
import { UserRole } from '@/types/enums'
import { IUserInfo } from '@/types/interfaces/User'
import API_INSTANCE from '@/lib/api'
import { CommonParams, PaginationResponse } from '@/types'

class UserService {

    current = (): Promise<AxiosResponse<IUserInfo>> => {
        return API_INSTANCE.get(USER_ENDPOINTS.CURRENT)
    }

    getAllUsersWithPag = (params: CommonParams): Promise<AxiosResponse<PaginationResponse>> => {
        return API_INSTANCE.get(USER_ENDPOINTS.GET_ALL_USER_PAGINATION, {
            params: params
        })
    }

    getRole = (): Promise<AxiosResponse<UserRole>> => {
        return API_INSTANCE.get(USER_ENDPOINTS.GET_ROLE)
    }

    findOne = (id: number): Promise<AxiosResponse<IUserInfo>> => {
        return API_INSTANCE.get(USER_ENDPOINTS.FIND_ONE(id))

    }

    createUser = (form: ICreateUserForm) => {
        return API_INSTANCE.post(USER_ENDPOINTS.CREATE_USER, form)
    }

    updateProfile = (form: FormData) => {
        return API_INSTANCE.patch(USER_ENDPOINTS.UPDATE_PROFILE, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    changePassword = (form: IChangePasswordForm) => {
        return API_INSTANCE.patch(USER_ENDPOINTS.CHANGE_PASSWORD, form)
    }
}

export const userService = new UserService();
