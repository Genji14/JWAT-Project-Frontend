import { userService } from "@/services/UserService";
import { UserRole } from "@/types/enums";
import { StateCreator } from "zustand";

export type TRoleState = {
    role: UserRole | null
}

export type TRoleAction = {
    getRole: () => Promise<void>
    removeRole: () => void
}

export type TRoleSlice = TRoleState & TRoleAction;

export const createRoleSlice: StateCreator<TRoleSlice> = (set) => ({
    role: null,
    getRole: async () => {

    },
    removeRole: () => set({ role: null })
});

// try {
//     const { data: role } = await userService.getRole();
//     set({ role: role });
// } catch (error) {
//     console.error(error);
//     set({ role: null });
// }