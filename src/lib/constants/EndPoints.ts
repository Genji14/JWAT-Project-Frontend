export const AUTH_ENDPOINTS = {
    SIGN_IN: `auth/login`,
    REFRESH_TOKEN: `auth/refresh-token`,
}

export const USER_ENDPOINTS = {
    CREATE_USER: `user/create`,
    UPDATE_PROFILE: (id: number) => `user/${id}`
}
