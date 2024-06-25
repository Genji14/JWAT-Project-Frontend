import { StateCreator } from 'zustand'
import { TUtilitySlice } from '../types/Utility'
import Cookies from 'js-cookie'

export const createUtilitySlice: StateCreator<TUtilitySlice> = (set) => ({
    isAddingMode: false,
    isManageMode: false,
    tokens: {
        accessToken: Cookies.get('accessToken') ?? '',
        refreshToken: Cookies.get('refreshToken') ?? '',
    },
    setToken: (token: 'accessToken' | 'refreshToken', value: string) =>
        set((state) => {
            if (token === 'accessToken') {
                Cookies.set('accessToken', value, { path: '/' })
            } else if (token === 'refreshToken') {
                Cookies.set('refreshToken', value, { path: '/' })
            }
            return {
                tokens: {
                    ...state.tokens,
                    [token]: value,
                },
            }
        }),
    defaultAddingMode: () => set(() => ({ isAddingMode: false })),
    toggleAdding: () => set((state) => ({ isAddingMode: !state.isAddingMode })),
    defaultManageMode: () => set(() => ({ isManageMode: false })),
    toggleManage: () => set((state) => ({ isManageMode: !state.isManageMode })),
})
