import { PROJECT_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios'
import { IProject } from '@/types/interfaces/Project'
import { AppService } from './app.service'

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
}

export const projectService = new ProjectService()