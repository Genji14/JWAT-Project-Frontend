import { Media } from ".."

export interface IKnowledge {
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date
    deteleAt: Date | null,
    media: Media
}