export type TExpandedState = {
    expanded: boolean
}

export type TExpandedAction = {
    toggle: () => void
}

export type TExpandedSlice = TExpandedState & TExpandedAction;