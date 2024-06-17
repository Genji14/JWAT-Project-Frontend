import { StateCreator } from 'zustand'
import { TAddingModeSlice } from '../types/AddingMode'

export const createAddingModeSlice: StateCreator<TAddingModeSlice> = (set) => ({
    isAddingMode: false,
    defaultAddingMode: () => set(() => ({ isAddingMode: false })),
    toggleAdding: () => set((state) => ({ isAddingMode: !state.isAddingMode }))
})
