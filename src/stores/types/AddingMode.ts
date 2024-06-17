export type TAddingModeState = {
    isAddingMode: boolean
}

export type TAddingModeAction = {
    defaultAddingMode: () => void
    toggleAdding: () => void
}

export type TAddingModeSlice = TAddingModeState & TAddingModeAction
