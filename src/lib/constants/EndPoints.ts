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
}

export const KNOWLEDGE_ENDPOINTS = {
    CREATE_KNOWLEDGE: `project/knowledge`,
    GET_KNOWLEDGE_BY_PROJECT: (id: number) => `project/knowledge/${id}`,

}