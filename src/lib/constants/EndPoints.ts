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
    PATCH_PROJECT: (id: number) => `project/${id}`,
    GET_PROJECTS_BY_USER: `project/user`,
    FIND_ONE: (id: number) => `project/${id}`,
    SEARCH: `project/search`,
    SEARCH_USER_NOT_IN_PROJECT: `project/findUserNotIn`,
    SEARCH_USERS_IN_PROJECT: (id: number) => `project/findUserIn/${id}`,
    INVITE_USER: `project/addUsers`,
    REMOVE_USER: `project/removeUsers`,
    ADD_DOCUMENT: (id: number) => `project/document/${id}`,
    REMOVE_DOCUMENT: (id: number) => `project/document/${id}`,
    ADD_DOCUMENT_GROUP: `project/document/grouping`,
    GET_ROOT_DOCUMENT_GROUP: (id: number) => `project/document/group/${id}`,
    UNGROUP_DOCUMENT: `project/document/grouping`,
    DELETE_DOCUMENT_GROUP: (id: number) => `project/document/group/${id}`,
    SEARCH_DOCUMENT: (id: number) => `project/document/${id}/search`,
}

export const BLOG_ENDPOINTS = {
    CREATE_BLOG: `blog/create`,
    GET_BLOG_LIST: `blog/all`,
    GET_STAR_BLOG: (id: number) => `blog/get-stars/${id}`,
    GET_COMMENT_BLOG: (id: number) => `blog/get-comments/${id}`,
    GET_HASHTAG_BLOG: (id: number) => `blog/get-hashtags/${id}`,
    GET_MEDIA_BLOG: (id: number) => `blog/get-medias/${id}`,
    SEARCH_BLOG: `blog/search`,
    DELETE_BLOG: (id: number) => `blog/${id}`,
}

export const KNOWLEDGE_ENDPOINTS = {
    CREATE_KNOWLEDGE: `project/knowledge`,
    REMOVE_KNOWLEDGE: (id: number) => `project/knowledge/${id}`,
    GET_KNOWLEDGE_BY_PROJECT: (id: number) => `project/knowledge/${id}`,
}

export const STAR_ENDPOINTS = {
    CREATE_OR_REMOVE: (id: number) => `star-detail/${id}`
}