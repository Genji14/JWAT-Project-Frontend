export type TUtilityState = {
    isAddingMode: boolean
    isManageMode: boolean
    tokens: {
        accessToken: string
        refreshToken: string
    }
    socket: any
}

export type TUtilityAction = {
    setToken: (token: 'accessToken' | 'refreshToken', value: string) => void
    defaultAddingMode: () => void
    toggleAdding: () => void
    defaultManageMode: () => void
    toggleManage: () => void
    createSocket: () => void
}

export type TUtilitySlice = TUtilityState & TUtilityAction
