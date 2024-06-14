export type TExpandedState = {
    expanded: boolean
}

export type TExpandedAction = {
    toggle: () => void
    block: () => void
}

export type TExpandedSlice = TExpandedState & TExpandedAction
