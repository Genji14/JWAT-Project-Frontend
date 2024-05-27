import { DOMAIN_NAME } from "@/lib/utils/constants/SettingSystem";
import axios, { type Method } from "axios";

axios.interceptors.request.use(async (config) => {
    // const session = await getSession();
    // config.headers.Authorization = session?.access_token || '';
    return config;
});

class BaseService {
    private async request(method: Method, url: string, data?: object | string, customHeaders?: object) {
        const requestConfig = { headers: customHeaders, data };
        const requestUrl = `${DOMAIN_NAME}${url}`;
        return axios.request({
            method,
            url: requestUrl,
            ...requestConfig,
            withCredentials: true
        });
    }
    put(url: string, data?: object | string) {
        return this.request('put', url, data);
    }

    post(url: string, data?: object | string) {
        return this.request('post', url, data);
    }

    get(url: string, data?: object | string) {
        return this.request('get', url, data);
    }

    delete(url: string, data?: object | string) {
        return this.request('delete', url, data);
    }
}

export { BaseService };