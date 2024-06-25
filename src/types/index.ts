import { mediaType } from './enums'

export type ExpandStore = {
    expanded: boolean
    toggle: () => void
}

export type DocumentStore = {
    documents: File[]
    addDocument: (files: File[]) => void
    removeDocument: (document: File) => void
    clean: () => void
}

export type RefreshTokenResponse = {
    accessToken: string
    refreshToken: string
}

export type Media = {
    id: number
    url: string
    cloudId: string
    mediaType: mediaType
}

export type Document = {
    id: number,
    name: string,
    url: string,
    createdAt: Date,
    updatedAt: Date,
    deleteAt: Date | null
}

export type HashTag = {
    id: number,
    hashTagName: string
}

export type Comment = {
    id: number,
    content: string,
    user: {
        id: number
    }
}

export type Star = {
    id: number,
    user: {
        id: number
    }
}

export type TUngroupDocument = {
    project: number,
    documents: number[]
}