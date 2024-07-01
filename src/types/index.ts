import { MediaType } from './enums'

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
    mediaType: MediaType
}

export type Document = {
    id: number
    name: string
    url: string
    createdAt: Date
    updatedAt: Date
    deleteAt: Date | null
}

export type HashTag = {
    id: number
    hashTagName: string
}

export type Comment = {
    id: number
    content: string
    user: {
        id: number
        fullName: string
        media: string
    }
}

export type Star = {
    id: number
    user: {
        id: number
    }
}

export type TUngroupDocument = {
    project: number
    documents: number[]
}

export type CommonParams = {
    limit: number,
    page: number
}

export type PaginationResponse = {
    items: any[],
    meta: TypeOrmPaginationMeta
}

export type TypeOrmPaginationMeta = {
    currentPage: number,
    itemCount: number,
    itemsPerPage: number,
    totalItems: number,
    totalPages: number
}
