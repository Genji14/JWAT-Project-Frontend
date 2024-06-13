import { StateCreator } from 'zustand'
import { TExpandedSlice } from '../types/Expand'

export const createExpandedSlice: StateCreator<TExpandedSlice> = (set) => ({
    expanded: true,
    toggle: () => set((state) => ({ expanded: !state.expanded })),
})
