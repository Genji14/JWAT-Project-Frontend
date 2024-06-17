import { IKnowledge } from "@/types/interfaces/Knowledge"
import { IProject } from "@/types/interfaces/Project"

export type TProjectDetailState = {
    project: IProject,
    knowledge: IKnowledge[]
}

export type TProjectDetailAction = {
    toggle: () => void
    block: () => void
}

export type TProjectDetailSlice = TProjectDetailState & TProjectDetailAction
