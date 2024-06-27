export type TCurrentUserState = {
    currentUserId: number | null
}

export type TCurrentUserAction = {
    setCurrentUserId: (id: number) => void
    removeCurrentUserId: () => void
}

export type TCurrentUserSlice = TCurrentUserState & TCurrentUserAction
