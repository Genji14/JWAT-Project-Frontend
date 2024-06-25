import { type ClassValue, clsx } from 'clsx'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

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

export const getUserAuth = () => {
    const accessToken = Cookies.get('accessToken') || '';
    const refreshToken = Cookies.get('refreshToken') || '';
    return { accessToken, refreshToken };
};

export const setUserAuth = (data: any) => {
    Cookies.set('accessToken', data.accessToken, { expires: 7 });
    Cookies.set('refreshToken', data.refreshToken, { expires: 7 });
};

export const removeUserAuth = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};