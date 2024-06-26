import { StateCreator } from 'zustand'
import { TUtilitySlice } from '../types/Utility'
import Cookies from 'js-cookie'
import { io } from 'socket.io-client'
import { DOMAIN_NAME } from '@/lib/constants/SettingSystem'

export const createUtilitySlice: StateCreator<TUtilitySlice> = (set) => ({
    isAddingMode: false,
    isManageMode: false,
    tokens: {
        accessToken: Cookies.get('accessToken') ?? '',
        refreshToken: Cookies.get('refreshToken') ?? '',
    },
    socket: null,
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
    createSocket: () =>
        set(() => {
            const socket = io(DOMAIN_NAME!)
            return {
                socket: socket,
            }
        }),
    removeSocket: () =>
        set((state) => ({
            socket: state.socket.disconnect(),
        })),
})
