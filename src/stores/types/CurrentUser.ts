import { UserRole } from '@/types/enums'

export type TCurrentUserState = {
    role: UserRole | null,
    currentUserId: number | null
}

export type TCurrentUserAction = {
    setCurrentUserId: (id: number) => void
    setRole: (role: UserRole) => void
    removeRole: () => void
    removeCurrentUserId: () => void
}

export type TCurrentUserSlice = TCurrentUserState & TCurrentUserAction
