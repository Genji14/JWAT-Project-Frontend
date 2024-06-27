import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore as useZustandStore, createStore } from 'zustand'
import { createExpandedSlice } from '@/stores/slices/ExpandedSlice'
import { createProjectDetailSlice } from '@/stores/slices/ProjectDetailSlice'
import { createUtilitySlice } from '@/stores/slices/UtilityStore'
import { createCurrentUserSlice } from "@/stores/slices/CurrentUserSlice"
import { createRoleSlice } from "@/stores/slices/RoleSlice"
import { TExpandedSlice } from '@/stores/types/Expand'
import { TProjectDetailSlice } from '@/stores/types/ProjectDetail'
import { TUtilitySlice } from '@/stores/types/Utility'
import { TCurrentUserSlice } from '@/stores/types/CurrentUser'
import { TRoleSlice } from '@/stores/types/Role'

export type TStore = TCurrentUserSlice & TExpandedSlice & TUtilitySlice & TProjectDetailSlice & TRoleSlice;

export const StoreContext = createContext<StoreApi<TStore> | null>(null)

export interface StoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const storeRef = useRef<StoreApi<TStore>>()
    if (!storeRef.current) {
        storeRef.current = createStore<TStore>((...a) => ({
            ...createCurrentUserSlice(...a),
            ...createRoleSlice(...a),
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
