import { StateCreator } from 'zustand'
import { TRoleSlice } from '../types/Role'
import { UserRole } from '@/types/enums'

export const createRoleSlice: StateCreator<TRoleSlice> = (set) => ({
    role: null,
    setRole: (role: UserRole) => {
        set({ role: role })
    },
    removeRole: () => set({ role: null }),
})
