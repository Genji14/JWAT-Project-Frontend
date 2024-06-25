import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore as useZustandStore, create } from 'zustand'
import { createExpandedSlice } from '@/stores/slices/ExpandedSlice'
import { createProjectDetailSlice } from '@/stores/slices/ProjectDetailSlice'
import { createUtilitySlice } from '@/stores/slices/UtilityStore'
import { TExpandedSlice } from '@/stores/types/Expand'
import { TProjectDetailSlice } from '@/stores/types/ProjectDetail'
import { TUtilitySlice } from '@/stores/types/Utility'
import { TCurrentUserSlice } from '@/stores/types/CurrentUser'
import { createCurrentUserSlice } from "@/stores/slices/CurrentUserSlice"

export type TStore = TCurrentUserSlice & TExpandedSlice & TUtilitySlice & TProjectDetailSlice;

export const StoreContext = createContext<StoreApi<TStore> | null>(null)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi<TStore>>()
    if (!storeRef.current) {
        storeRef.current = create<TStore>((...a) => ({
            ...createCurrentUserSlice(...a),
            ...createExpandedSlice(...a),
            ...createUtilitySlice(...a),
            ...createProjectDetailSlice(...a)
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
