export const USER_QUERY_KEY = {
    CURRENT: 'getCurrentUser',
    FIND_ONE: 'findOneUser',
    GET_ALL_WITH_PAGINATION: 'getAllWithPag'
}

export const PROJECT_QUERY_KEY = {
    SEARCH: 'searchProject',
    GET_PROJECTS_BY_USER: 'getProjectByUser',
    FIND_ONE: 'findOneProject',
    SEARCH_USER_NOT_IN_PROJECT: 'searchUserNotInProject',
    SEARCH_USERS_IN_PROJECT: 'searchUsersInProject',
    GET_PROJECT_ROOT_DOCUMENT: 'getProjectRootDocument',
    SEARCH_DOCUMENT: 'searchDocument',
}

export const KNOWLEDGE_QUERY_KEY = {
    GET_KNOWLEDGES_BY_PROJECT: 'getKnowledgesByProject',
}

export const BLOG_QUERY_KEY = {
    GET_BLOG_LIST: 'getBlogList',
    GET_BLOG_ITEM: 'getBlogItem',
    GET_STAR_BLOG: 'getStarBlog',
    GET_COMMENT_BLOG: 'getCommentBlog',
    GET_HASHTAG_BLOG: 'getHashTagBlog',
    GET_MEDIA_BLOG: 'getMediaBlog',
}
