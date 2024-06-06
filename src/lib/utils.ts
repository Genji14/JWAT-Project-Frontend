import { type ClassValue, clsx } from 'clsx'
import { authService } from '@/services/AuthService';
import Cookies from 'js-cookie';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge'
import {
    AbilityBuilder,
    ExtractSubjectType,
    MongoQuery,
    Subject,
    SubjectRawRule,
    createMongoAbility,
} from '@casl/ability'
import { UserRole } from '@/types/enums'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function defineRulesFor(
    role: UserRole
): SubjectRawRule<string, ExtractSubjectType<Subject>, MongoQuery>[] {
    const { can, cannot, rules } = new AbilityBuilder(createMongoAbility)

    if (role === UserRole.ADMIN) {
        can('manage', 'all')
    }

    if (role === UserRole.EMPLOYEE) {
        can('read', 'all')
        cannot('manage', 'all')
    }

    return rules
}

export function convertAlt(fullName: string): string {
    if (fullName) {
        let words = fullName.split(' ');
        let name = words[words.length - 1].charAt(0) + words[0].charAt(0);
        return name.toUpperCase();
    }
    return "";
}

export const refreshToken = async () => {
    const refreshToken = Cookies.get('refreshToken') ?? '';
    try {
        const { data } = await authService.refreshToken(refreshToken);
        if (data) {
            Cookies.set('accessToken', data.accessToken);
            Cookies.set('refreshToken', data.refreshToken);
            let decoded: any = jwtDecode<JwtPayload>(data.accessToken);
            Cookies.set('role', decoded.role);
            return data.accessToken;
        }
    } catch {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('role');
        toast.message('Token expired', {
            description: 'Your working session is expired, please sign in again.',
        });
        setTimeout(() => {
            window.location.href = '/sign-in';
        }, 3000);
    }
};
