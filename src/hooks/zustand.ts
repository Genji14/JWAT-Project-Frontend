"use client"

import { ExpandStore } from "@/types";
import { create } from "zustand";

export const useExpandedStore = create<ExpandStore>((set) => ({
    expanded: true,
    toggle: () => set((state) => ({ expanded: !state.expanded })),
}))