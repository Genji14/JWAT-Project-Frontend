import axios from 'axios'
import { DOMAIN_NAME, SERVICE_NAME } from './SettingSystem'
import { getAccessTokenSSR } from '../utils'

export const API_INSTANCE = axios.create({
    baseURL: DOMAIN_NAME,
    // baseURL: SERVICE_NAME, //For deployment purpose only
})

export const authorizeSSR = (req: any) => {
    const accessToken = getAccessTokenSSR(req)
    API_INSTANCE.interceptors.request.use(async (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    // API_INSTANCE.interceptors.response.use(
    //     (response) => response,
    //     async (error) => {
    //         const originalRequest = error.config
    //         if (error.response.status === 419 && !originalRequest._retry) {
    //             originalRequest._retry = true
    //             const newAccessToken = await refreshToken()
    //             if (newAccessToken) {
    //                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
    //                 return API_INSTANCE(originalRequest)
    //             }
    //         }
    //         return Promise.reject(error)
    //     }
    // )
}
