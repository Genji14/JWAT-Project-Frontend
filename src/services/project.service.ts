import { PROJECT_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios'
import { IProject, IProjectRootDocument } from '@/types/interfaces/Project'
import { AppService } from './app.service'
import { ISearchUserNotInProjectParams } from '@/types/interfaces/Param'
import {
    IAddUserToProjectForm,
    ICreateDocumentGroupForm,
} from '@/types/interfaces/Form'
import { TUngroupDocument } from '@/types'

class ProjectService extends AppService {
    constructor() {
        super()
    }

    createProject = (form: FormData) => {
        return this.post(PROJECT_ENDPOINTS.CREATE_PROJECT, form)
    }

    findOne = (id: number) => {
        return this.get(PROJECT_ENDPOINTS.FIND_ONE(id))
    }

    getProjectsByEmployee = (): Promise<AxiosResponse<IProject[]>> => {
        return this.get(PROJECT_ENDPOINTS.GET_PROJECTS_BY_USER)
    }

    searchProjects = (name?: string): Promise<AxiosResponse<IProject[]>> => {
        return this.get(PROJECT_ENDPOINTS.SEARCH, undefined, {
            name,
        })
    }

    searchUserNotInProject = (param: ISearchUserNotInProjectParams) => {
        return this.get(
            PROJECT_ENDPOINTS.SEARCH_USER_NOT_IN_PROJECT,
            undefined,
            param
        )
    }

    inviteUser = (form: IAddUserToProjectForm) => {
        return this.post(PROJECT_ENDPOINTS.INVITE_USER, form)
    }

    addDocument = (projectId: number, form: FormData) => {
        return this.post(PROJECT_ENDPOINTS.ADD_DOCUMENT(projectId), form)
    }

    removeDocument = (projectId: number, form: FormData) => {
        return this.delete(PROJECT_ENDPOINTS.REMOVE_DOCUMENT(projectId), form)
    }

    addDocumentGroup = (form: ICreateDocumentGroupForm) => {
        return this.post(PROJECT_ENDPOINTS.ADD_DOCUMENT_GROUP, form)
    }

    getRootDocument = (
        projectId: number
    ): Promise<AxiosResponse<IProjectRootDocument>> => {
        return this.get(PROJECT_ENDPOINTS.GET_ROOT_DOCUMENT_GROUP(projectId))
    }

    searchDocument = (projectId: number, param: { name: string }) => {
        return this.get(
            PROJECT_ENDPOINTS.SEARCH_DOCUMENT(projectId),
            undefined,
            param
        )
    }

    ungroupDocument = (req: TUngroupDocument) => {
        return this.delete(PROJECT_ENDPOINTS.UNGROUP_DOCUMENT, req)
    }

    deleteGroup = (groupId: number) => {
        return this.delete(PROJECT_ENDPOINTS.DELETE_DOCUMENT_GROUP(groupId))
    }
}

export const projectService = new ProjectService()
