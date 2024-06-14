import { type ClassValue, clsx } from 'clsx'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import axios from 'axios'
import { authService } from '@/services/auth.service'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function convertAlt(fullName: string): string {
    if (fullName) {
        let words = fullName.split(' ')
        let name = words[words.length - 1].charAt(0) + words[0].charAt(0)
        return name.toUpperCase()
    }
    return ''
}

export const refreshToken = async () => {
    const refreshToken = Cookies.get('refreshToken') ?? ''
    try {
        const { data } = await authService.refreshToken(refreshToken)
        if (data) {
            Cookies.set('accessToken', data.accessToken)
            Cookies.set('refreshToken', data.refreshToken)
            return data.accessToken
        }
    } catch {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        toast.message('Token expired', {
            description:
                'Your working session is expired, please sign in again.',
        })
        setTimeout(() => {
            window.location.href = '/sign-in'
        }, 3000)
    }
}

export const authorizeServerHeader = (accessToken: string) => {
    axios.interceptors.request.use(async (config) => {
        config.headers.Authorization = accessToken
            ? `Bearer ${accessToken}`
            : ''

        console.log(config.headers.Authorization)
        return config
    })

}

export const getAccessToken = (req: any) => {
    const cookies = req.headers.cookie;
    const cookieArray = cookies.split(';');

    let accessToken = '';
    for (let i = 0; i < cookieArray.length; i++) {
        if (cookieArray[i].trim().startsWith('accessToken=')) {
            accessToken = cookieArray[i].split('=')[1];
            break;
        }
    }
    return accessToken;
}