import { type ClassValue, clsx } from 'clsx'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'
import { authService } from '@/services/auth.service'
import { AUTH_ENDPOINTS } from './constants/EndPoints'


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

// export const refreshToken = async () => {

//     console.log(Cookies.get('refreshToken'))
//     const refreshToken = Cookies.get('refreshToken') ?? ''
//     try {
//         const { data } = await authService.refreshToken(refreshToken);
//         if (data) {
//             Cookies.set('accessToken', data.accessToken, { path: '/' });
//             Cookies.set('refreshToken', data.refreshToken, { path: '/' });
//             console.log(Cookies.get('refreshToken'))
//             return data.accessToken;
//         }
//     } catch (error) {
//         Cookies.remove('accessToken');
//         Cookies.remove('refreshToken');
//         Cookies.set("expired", 'true', { path: '/' });
//         return null;
//     }
// }

// export const refreshTokenSSR = async (accessToken: string, refreshToken: string, req: any) => {
//     console.log(req.headers.cookie);
//     try {
//         const { data } = await API_INSTANCE.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
//             refreshToken
//         }, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`
//             }
//         });
//         if (data) {
//             Cookies.set('accessToken', data.accessToken)
//             Cookies.set('refreshToken', data.refreshToken)
//             req.headers.cookie = "accessToken=" + data.accessToken + "; refreshToken=" + data.refreshToken;
//             console.log(req.headers.cookie);
//             return data.accessToken;
//         }
//     } catch (error) {
//         console.log(error);
//         Cookies.remove('accessToken');
//         Cookies.remove('refreshToken');
//         return null;
//     }
// };

// export const getAccessTokenSSR = (req: any) => {
//     const cookies = req.headers.cookie || '';
//     const cookieArray = cookies.split(';');

//     let accessToken = '';
//     for (let i = 0; i < cookieArray.length; i++) {
//         if (cookieArray[i].trim().startsWith('accessToken=')) {
//             accessToken = cookieArray[i].split('=')[1];
//             break;
//         }
//     }
//     return accessToken;
// };

// export const getRefreshTokenSSR = (req: any) => {
//     const cookies = req.headers.cookie || '';
//     const cookieArray = cookies.split(';');

//     let refreshToken = '';
//     for (let i = 0; i < cookieArray.length; i++) {
//         if (cookieArray[i].trim().startsWith('refreshToken=')) {
//             refreshToken = cookieArray[i].split('=')[1];
//             break;
//         }
//     }
//     return refreshToken;
// };

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