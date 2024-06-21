import axios from "axios";
import { DOMAIN_NAME } from "./SettingSystem";
import { getAccessTokenSSR, getRefreshTokenSSR, refreshTokenSSR } from "../utils";

export const API_INSTANCE = axios.create({
    baseURL: DOMAIN_NAME
})

export const authorizeSSR = (req: any) => {
    let accessToken = getAccessTokenSSR(req);
    const refreshToken = getRefreshTokenSSR(req);

    API_INSTANCE.interceptors.request.use(async (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    });

    API_INSTANCE.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 419 && !originalRequest._retry) {
                originalRequest._retry = true;
                accessToken = await refreshTokenSSR(accessToken, refreshToken, req);
                if (accessToken) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return API_INSTANCE(originalRequest);
                }
            }
            return Promise.reject(error);
        }
    );
};

