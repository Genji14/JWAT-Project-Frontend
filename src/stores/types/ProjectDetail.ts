import { IDocumentResult, IProjectRootDocument } from "@/types/interfaces/Project"

export type TProjectDetailState = {
    documentRoot: IProjectRootDocument | undefined,
    documentResults: IDocumentResult[] | undefined,
}

export type TProjectDetailAction = {
    setDocumentRoot: (documentRoot: IProjectRootDocument) => void,
    setDocumentResults: (documentResults: IDocumentResult[]) => void,
    clearProjectData: () => void,
    clearDocumentResults: () => void
}

export type TProjectDetailSlice = TProjectDetailState & TProjectDetailAction
