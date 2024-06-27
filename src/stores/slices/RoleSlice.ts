import { StateCreator } from 'zustand';
import { UserRole } from '@/types/enums';
import { TRoleSlice } from '../types/Role';

export const createRoleSlice: StateCreator<TRoleSlice> = (set) => ({
    role: null,

    setRole: (role: UserRole) => {
        set(() => ({ role: role }));
    },
    removeRole: () => set(() => ({ role: null })),
});
