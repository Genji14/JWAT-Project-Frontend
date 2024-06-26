import { PROJECT_ENDPOINTS } from '@/lib/constants/EndPoints'
import { AxiosResponse } from 'axios'
import { IProject, IProjectRootDocument } from '@/types/interfaces/Project'
import { ISearchUserNotInProjectParams } from '@/types/interfaces/Param'
import {
    IAddUserToProjectForm,
    ICreateDocumentGroupForm,
    IRemoveUsersFromProjectForm,
} from '@/types/interfaces/Form'
import { TUngroupDocument } from '@/types'
import API_INSTANCE from '@/lib/api'

class ProjectService {
    createProject = (form: FormData) => {
        return API_INSTANCE.post(PROJECT_ENDPOINTS.CREATE_PROJECT, form, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    findOne = (id: number) => {
        return API_INSTANCE.get(PROJECT_ENDPOINTS.FIND_ONE(id))
    }

    getProjectsByEmployee = (): Promise<AxiosResponse<IProject[]>> => {
        return API_INSTANCE.get(PROJECT_ENDPOINTS.GET_PROJECTS_BY_USER)
    }

    searchProjects = (name?: string): Promise<AxiosResponse<IProject[]>> => {
        return API_INSTANCE.get(PROJECT_ENDPOINTS.SEARCH, {
            params: {
                name,
            },
        })
    }

    searchUserNotInProject = (param: ISearchUserNotInProjectParams) => {
        return API_INSTANCE.get(PROJECT_ENDPOINTS.SEARCH_USER_NOT_IN_PROJECT, {
            params: param,
        })
    }

    inviteUser = (form: IAddUserToProjectForm) => {
        return API_INSTANCE.post(PROJECT_ENDPOINTS.INVITE_USER, form)
    }

    addDocument = (projectId: number, form: FormData) => {
        return API_INSTANCE.post(
            PROJECT_ENDPOINTS.ADD_DOCUMENT(projectId),
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    }

    addDocumentGroup = (form: ICreateDocumentGroupForm) => {
        return API_INSTANCE.post(PROJECT_ENDPOINTS.ADD_DOCUMENT_GROUP, form)
    }

    removeDocument = (id: number) => {
        return API_INSTANCE.delete(PROJECT_ENDPOINTS.REMOVE_DOCUMENT(id))
    }

    getRootDocument = (
        projectId: number
    ): Promise<AxiosResponse<IProjectRootDocument>> => {
        return API_INSTANCE.get(
            PROJECT_ENDPOINTS.GET_ROOT_DOCUMENT_GROUP(projectId)
        )
    }

    searchDocument = (projectId: number, param: { name: string }) => {
        return API_INSTANCE.get(PROJECT_ENDPOINTS.SEARCH_DOCUMENT(projectId), {
            params: param,
        })
    }

    ungroupDocument = (req: TUngroupDocument) => {
        return API_INSTANCE.delete(PROJECT_ENDPOINTS.UNGROUP_DOCUMENT, {
            data: req,
        })
    }

    deleteGroup = (groupId: number) => {
        return API_INSTANCE.delete(
            PROJECT_ENDPOINTS.DELETE_DOCUMENT_GROUP(groupId)
        )
    }

    updateProject = (projectId: number, form: FormData) => {
        return API_INSTANCE.patch(
            PROJECT_ENDPOINTS.PATCH_PROJECT(projectId),
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
    }

    searchUsersInProject = (projectId: number) => {
        return API_INSTANCE.get(
            PROJECT_ENDPOINTS.SEARCH_USERS_IN_PROJECT(projectId)
        )
    }

    removeUser = (form: IRemoveUsersFromProjectForm) => {
        return API_INSTANCE.delete(PROJECT_ENDPOINTS.REMOVE_USER, {
            data: {
                ...form,
            },
        })
    }
}

export const projectService = new ProjectService()
