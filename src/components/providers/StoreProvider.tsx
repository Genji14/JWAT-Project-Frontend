import { TExpandedSlice } from '@/stores/slices/ExpandedSlice';
import { TRoleSlice } from '@/stores/slices/RoleSlice';
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore as useZustandStore, create } from 'zustand'
import { createRoleSlice } from "@/stores/slices/RoleSlice"
import { createExpandedSlice } from "@/stores/slices/ExpandedSlice"

export type TStore = TRoleSlice & TExpandedSlice;

export const StoreContext = createContext<StoreApi<TStore> | null>(null)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi<TStore>>()
    if (!storeRef.current) {
        storeRef.current = create<TStore>((...a) => ({
            ...createRoleSlice(...a),
            ...createExpandedSlice(...a)
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
