import { PROJECT_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios'
import { IProject } from '@/types/interfaces/Project'
import { AppService } from './app.service'
import { ISearchUserNotInProjectParams } from '@/types/interfaces/Param'
import { IAddUserToProjectForm } from '@/types/interfaces/Form'

class ProjectService extends AppService {
    constructor() {
        super()
    }

    createProject = (form: FormData) => {
        return this.post(PROJECT_ENDPOINTS.CREATE_PROJECT, form)
    }

    findOne = (id: number) => {
        return this.get(PROJECT_ENDPOINTS.FIND_ONE(id));
    }

    getProjectsByEmployee = (): Promise<AxiosResponse<IProject[]>> => {
        return this.get(PROJECT_ENDPOINTS.GET_PROJECTS_BY_USER);
    }

    searchProjects = (name?: string): Promise<AxiosResponse<IProject[]>> => {
        return this.get(PROJECT_ENDPOINTS.SEARCH, undefined, {
            name,
        })
    }

    searchUserNotInProject = (param: ISearchUserNotInProjectParams) => {
        return this.get(PROJECT_ENDPOINTS.SEARCH_USER_NOT_IN_PROJECT, undefined, param);
    }

    inviteUser = (form: IAddUserToProjectForm) => {
        return this.post(PROJECT_ENDPOINTS.INVITE_USER, form);
    }
}

export const projectService = new ProjectService()
