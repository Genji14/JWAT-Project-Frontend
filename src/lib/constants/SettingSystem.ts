import { Poppins } from 'next/font/google'

export const DOMAIN_NAME = process.env.NEXT_PUBLIC_API_SERVER

export const FONT_POPPINS = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

export const LIGHT_THEME = 'light'
export const DARK_THEME = 'dark'

