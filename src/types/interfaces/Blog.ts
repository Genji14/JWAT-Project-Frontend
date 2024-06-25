export interface IBlog {
    id: number,
    title: string
    content: string,
    createdAt: Date
    user: {
        id: number
    }
}