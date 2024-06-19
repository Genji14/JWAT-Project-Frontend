import { StateCreator } from 'zustand'
import { TProjectDetailSlice } from '../types/ProjectDetail'
import { IDocumentResult, IProjectRootDocument } from '@/types/interfaces/Project'

export const createProjectDetailSlice: StateCreator<TProjectDetailSlice> = (set) => ({
    documentRoot: undefined,
    documentResults: undefined,
    setDocumentRoot: (documentRoot: IProjectRootDocument) => set(() => ({ documentRoot: documentRoot })),
    setDocumentResults: (documentResults: IDocumentResult[]) => set(() => ({ documentResults: documentResults })),
    clearDocumentResults: () => set(() => ({ documentResults: undefined })),
    clearProjectData: () => set(() => ({ documentRoot: undefined }))
})
