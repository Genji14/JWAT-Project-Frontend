import { Comment, HashTag, Media, Star } from ".."
import { IUserInfo } from "./User"

export interface IBlog {
    id: number,
    title: string
    content: string,
    createdAt: Date
    user: {
        id: number
    }
}


export interface IBlogItemDetail {
    userInfo: IUserInfo,
    comments: Comment[],
    stars: Star[],
    hashTags: HashTag[],
    media: Media[]
}