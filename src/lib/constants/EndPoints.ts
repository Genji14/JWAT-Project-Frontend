export const AUTH_ENDPOINTS = {
    SIGN_IN: `auth/login`,
    REFRESH_TOKEN: `auth/refresh-token`,
}

export const USER_ENDPOINTS = {
    CREATE_USER: `user/create`,
    CURRENT: `user/current`,
    FIND_ONE: (id: number) => `user/${id}`,
    UPDATE_PROFILE: `user/update`,
    CHANGE_PASSWORD: `user/change-password`,
    GET_ROLE: `user/get-role`,
}

export const PROJECT_ENDPOINTS = {
    CREATE_PROJECT: `project`,
    GET_PROJECTS_BY_USER: `project/user`,
    FIND_ONE: (id: number) => `project/${id}`,
    SEARCH: `project/search`,
    SEARCH_USER_NOT_IN_PROJECT: `project/findUserNotIn`,
    INVITE_USER: `project/addUsers`,
    ADD_DOCUMENT: (id: number) => `project/document/${id}`,
    ADD_DOCUMENT_GROUP: `project/document/grouping`,
    GET_ROOT_DOCUMENT_GROUP: (id: number) => `project/document/group/${id}`,
    UNGROUP_DOCUMENT: `project/document/grouping`,
    DELETE_DOCUMENT_GROUP: (id: number) => `project/document/group/${id}`,
    SEARCH_DOCUMENT: (id: number) => `project/document/${id}/search`
}

export const KNOWLEDGE_ENDPOINTS = {
    CREATE_KNOWLEDGE: `project/knowledge`,
    GET_KNOWLEDGE_BY_PROJECT: (id: number) => `project/knowledge/${id}`,


}