import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { getUserAuth, removeUserAuth, setUserAuth } from '../utils'
import { DOMAIN_NAME } from '../constants/SettingSystem'
import { AUTH_ENDPOINTS } from '../constants/EndPoints'
import Cookies from 'js-cookie'

const isServer = () => typeof window === 'undefined'

let context: GetServerSidePropsContext | null = null

export const setContext = (_context: GetServerSidePropsContext) => {
    context = _context
}

const API_INSTANCE = axios.create({
    baseURL: DOMAIN_NAME + "/api/",
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

API_INSTANCE.interceptors.request.use((config) => {
    if (isServer() && context) {
        // config.baseURL = SERVICE_NAME
        const cookies = context.req.headers.cookie || ''
        const accessToken = getCookieValue(cookies, 'accessToken')
        if (accessToken)
            config.headers['Authorization'] = `Bearer ${accessToken}`
    } else if (!isServer()) {
        const userAuth = getUserAuth()
        if (userAuth) {
            config.headers['Authorization'] = `Bearer ${userAuth.accessToken}`
        }
    }

    return config
})

const getCookieValue = (cookies: string, cookieName: string) => {
    const cookie = cookies
        .split(';')
        .find((c) => c.trim().startsWith(`${cookieName}=`))
    return cookie ? cookie.split('=')[1] : null
}

API_INSTANCE.interceptors.response.use(
    (response) => response,
    async (
        error: AxiosError & {
            response: { config: { __isRetryRequest: boolean } }
        }
    ) => {
        if (
            error.response &&
            error.response.status === 419 &&
            error.response.config &&
            !error.response.config.url?.includes('auth') &&
            !error.response.config.__isRetryRequest
        ) {
            return refreshToken(error)
        }
        return Promise.reject(error)
    }
)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve({ token })
        }
    })

    failedQueue = []
}

const refreshToken = async (
    error: AxiosError & { response: { config: { __isRetryRequest: boolean } } }
) => {
    return new Promise((resolve, reject) => {
        const originalRequest = error.response?.config

        failedQueue.push({ resolve, reject })

        if (!isRefreshing) {
            isRefreshing = true

            let refreshPromise: Promise<AxiosResponse<any, any>> | null = null

            if (isServer() && context) {
                const cookies = context.req.headers.cookie || ''
                const refreshToken = getCookieValue(cookies, 'refreshToken')

                if (refreshToken) {
                    refreshPromise = API_INSTANCE.post(
                        AUTH_ENDPOINTS.REFRESH_TOKEN,
                        {
                            refreshToken,
                        }
                    )
                }
            } else if (!isServer()) {
                const userAuth = getUserAuth()

                if (userAuth?.refreshToken) {
                    refreshPromise = API_INSTANCE.post(
                        AUTH_ENDPOINTS.REFRESH_TOKEN,
                        {
                            refreshToken: userAuth.refreshToken,
                        }
                    )
                }
            }

            if (refreshPromise) {
                refreshPromise
                    .then((response) => {
                        const { accessToken, refreshToken } = response.data

                        if (isServer() && context) {
                            context.res.setHeader('Set-Cookie', [
                                `accessToken=${accessToken}; Max-Age=604800; SameSite=Lax; Path=/`,
                                `refreshToken=${refreshToken}; Max-Age=604800; SameSite=Lax; Path=/`,
                            ])
                        } else if (!isServer()) {
                            setUserAuth({
                                accessToken,
                                refreshToken,
                            })
                        }

                        originalRequest!.headers['Authorization'] =
                            'Bearer ' + accessToken
                        originalRequest!.__isRetryRequest = true
                        processQueue(null, accessToken)
                        resolve(API_INSTANCE(originalRequest!))
                    })
                    .catch((err) => {
                        processQueue(err, null)
                        if (!isServer()) {
                            removeUserAuth()
                            Cookies.set('expired', true.toString())
                        } else if (context && !context.res.headersSent) {
                            context.res.setHeader('Set-Cookie', [
                                `accessToken=; Max-Age=0; SameSite=Lax; Path=/`,
                                `refreshToken=; Max-Age=0; SameSite=Lax; Path=/`,
                            ])
                            context.res.setHeader('location', '/sign-in')
                            context.res.statusCode = 302
                            context.res.end()
                        }
                        reject(err)
                    })
                    .finally(() => {
                        isRefreshing = false
                    })
            } else {
                processQueue(new Error('Refresh token not found'), null)
                if (!isServer()) {
                    removeUserAuth()
                    Cookies.set('expired', true.toString())
                } else if (context && !context.res.headersSent) {
                    context.res.setHeader('Set-Cookie', [
                        `accessToken=; Max-Age=0; SameSite=Lax; Path=/`,
                        `refreshToken=; Max-Age=0; SameSite=Lax; Path=/`,
                    ])
                    context.res.setHeader('location', '/auth')
                    context.res.statusCode = 302
                    context.res.end()
                }
            }
        }
    })
}

export default API_INSTANCE
