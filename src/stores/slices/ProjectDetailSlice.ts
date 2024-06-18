import { StateCreator } from 'zustand'
import { TProjectDetailSlice } from '../types/ProjectDetail'
import { IProjectRootDocument } from '@/types/interfaces/Project'

export const createProjectDetailSlice: StateCreator<TProjectDetailSlice> = (set) => ({
    documentRoot: undefined,
    setDocumentRoot: (documentRoot: IProjectRootDocument) => set(() => ({ documentRoot: documentRoot })),
    clearProjectData: () => set(() => ({ documentRoot: undefined }))
})
