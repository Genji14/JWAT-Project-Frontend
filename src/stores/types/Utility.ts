export type TUtilityState = {
    isAddingMode: boolean
    isManageMode: boolean
    tokens: {
        accessToken: string
        refreshToken: string
    }
}

export type TUtilityAction = {
    setToken: (token: 'accessToken' | 'refreshToken', value: string) => void
    defaultAddingMode: () => void
    toggleAdding: () => void
    defaultManageMode: () => void
    toggleManage: () => void
}

export type TUtilitySlice = TUtilityState & TUtilityAction
