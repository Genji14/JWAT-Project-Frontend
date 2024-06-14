import axios from "axios";
import { DOMAIN_NAME } from "./SettingSystem";
import { getAccessToken } from "../utils";

export const API_INSTANCE = axios.create({
    baseURL: DOMAIN_NAME
})

export const authorizeSSR = (req: any) => {
    const accessToken = getAccessToken(req);
    API_INSTANCE.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${accessToken}`
        return config
    })

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

