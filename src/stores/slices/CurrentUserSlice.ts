import { StateCreator } from 'zustand';
import { TCurrentUserSlice } from '../types/CurrentUser';

export const createCurrentUserSlice: StateCreator<TCurrentUserSlice> = (set) => ({
    currentUserId: null,
    setCurrentUserId: (id: number) => {
        set(() => ({ currentUserId: id }));
    },
    removeCurrentUserId: () => set(() => ({ currentUserId: null })),
});
