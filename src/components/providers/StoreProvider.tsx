import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore as useZustandStore, create } from 'zustand'
import { createRoleSlice } from '@/stores/slices/RoleSlice'
import { createExpandedSlice } from '@/stores/slices/ExpandedSlice'
import { createAddingModeSlice } from '@/stores/slices/AddingModeSlice'
import { TRoleSlice } from '@/stores/types/Role'
import { TExpandedSlice } from '@/stores/types/Expand'
import { TAddingModeSlice } from '@/stores/types/AddingMode'

export type TStore = TRoleSlice & TExpandedSlice & TAddingModeSlice

export const StoreContext = createContext<StoreApi<TStore> | null>(null)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi<TStore>>()
    if (!storeRef.current) {
        storeRef.current = create<TStore>((...a) => ({
            ...createRoleSlice(...a),
            ...createExpandedSlice(...a),
            ...createAddingModeSlice(...a)
        }))
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = <T,>(selector: (store: TStore) => T): T => {
    const storeContext = useContext(StoreContext)

    if (!storeContext) {
        throw new Error(`useStore must be use within StoreProvider`)
    }

    return useZustandStore(storeContext, selector)
}
