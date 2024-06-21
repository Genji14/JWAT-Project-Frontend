export type TUtilityState = {
    isAddingMode: boolean,
    tokens: {
        accessToken: string,
        refreshToken: string
    }
}

export type TUtilityAction = {
    setToken: (token: "accessToken" | "refreshToken", value: string) => void
    defaultAddingMode: () => void,
    toggleAdding: () => void,
}

export type TUtilitySlice = TUtilityState & TUtilityAction
