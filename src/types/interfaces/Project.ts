import { Document, Media } from '..'

export interface IProject {
    id: number
    description: string
    name: string
    media: Media
    createdAt: Date
    updatedAt: Date
    deleteAt: Date | null
    owner: number
}


export interface IProjectRootDocument {
    id: number,
    name: string,
    children: any[],
    documents: Document[]
}