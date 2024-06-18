import { IProjectRootDocument } from "@/types/interfaces/Project"

export type TProjectDetailState = {
    documentRoot: IProjectRootDocument | undefined,
}

export type TProjectDetailAction = {
    setDocumentRoot: (documentRoot: IProjectRootDocument) => void,
    clearProjectData: () => void
}

export type TProjectDetailSlice = TProjectDetailState & TProjectDetailAction
