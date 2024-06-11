import { UserRole } from '@/types/enums'

export type TRoleState = {
    role: UserRole | null
}

export type TRoleAction = {
    setRole: (role: UserRole) => void
    removeRole: () => void
}

export type TRoleSlice = TRoleState & TRoleAction
