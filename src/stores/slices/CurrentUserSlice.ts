import { StateCreator } from 'zustand'
import { UserRole } from '@/types/enums'
import { TCurrentUserSlice } from '../types/CurrentUser'

export const createCurrentUserSlice: StateCreator<TCurrentUserSlice> = (set) => ({
    role: null,
    currentUserId: null,
    setCurrentUserId: (id: number) => {
        set(({ currentUserId: id }))
    },
    setRole: (role: UserRole) => {
        set(({ role: role }))
    },
    removeRole: () => set((state) => ({ ...state, role: null })),
    removeCurrentUserId: () => set((state) => ({ ...state, currentUserId: null })),

})
