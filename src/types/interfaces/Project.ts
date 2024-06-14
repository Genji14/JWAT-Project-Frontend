import { Media } from '..'

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
