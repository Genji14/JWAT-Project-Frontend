import { DOMAIN_NAME } from '@/lib/constants/SettingSystem'
import axios, { type Method } from 'axios'
import Cookies from 'js-cookie'
import { refreshToken } from '@/lib/utils'

axios.interceptors.request.use(async (config) => {
    config.headers.Authorization = Cookies.get('accessToken')
        ? `Bearer ${Cookies.get('accessToken')}`
        : ''
    return config
})

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;
            const newAccessToken = await refreshToken();
            if (newAccessToken) {
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

class BaseService {
    private async request(
        method: Method,
        url: string,
        data?: object | string,
        customHeaders?: object
    ) {
        const requestConfig = { headers: customHeaders, data }
        const requestUrl = `${DOMAIN_NAME}${url}`
        return axios.request({
            method,
            url: requestUrl,
            ...requestConfig,
        })
    }
    put(url: string, data?: object | string) {
        return this.request('put', url, data)
    }

    patch(url: string, data?: object | string) {
        return this.request('patch', url, data)
    }

    post(url: string, data?: object | string) {
        return this.request('post', url, data)
    }

    get(url: string, data?: object | string) {
        return this.request('get', url, data)
    }

    delete(url: string, data?: object | string) {
        return this.request('delete', url, data)
    }
}

export { BaseService }
