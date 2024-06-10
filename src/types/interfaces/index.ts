import { Media } from ".."
import { Gender, UserRole } from "../enums"

export interface IUserSignIn {
    username: string
    password: string
}

export interface IUserInfo {
    id: number
    media?: Media
    fullName: string
    phoneNumber: string
    email: string
    gender: Gender
    dob: Date
    address: string
    createdAt: Date
    updatedAt: Date
    username: string
    role: UserRole

}
