import { StateCreator } from "zustand";

export type TExpandedState = {
    expanded: boolean
}

export type TExpandedAction = {
    toggle: () => void
}

export type TExpandedSlice = TExpandedState & TExpandedAction;

export const createExpandedSlice: StateCreator<TExpandedSlice> = (set) => ({
    expanded: true,
    toggle: () => set((state) => ({ expanded: !state.expanded }))
})