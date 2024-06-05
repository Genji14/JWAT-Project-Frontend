import { type ClassValue, clsx } from 'clsx'
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
