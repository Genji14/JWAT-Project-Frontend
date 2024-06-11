import { PROJECT_ENDPOINTS } from '@/lib/constants/EndPoints'
import { BaseService } from './BaseService'
import { AxiosResponse } from 'axios'
import { IProject } from '@/types/interfaces/Project'

class ProjectService extends BaseService {
    constructor() {
        super()
    }

    createProject = (form: FormData) => {
        return this.post(PROJECT_ENDPOINTS.CREATE_PROJECT, form)
    }

    searchProjects = (name?: string): Promise<AxiosResponse<IProject[]>> => {
        return this.get(PROJECT_ENDPOINTS.SEARCH_BY_EMPLOYEE, undefined, {
            name,
        })
    }
}

export const projectService = new ProjectService()
