import { Media } from '..'
import { Gender, UserRole } from '../enums'

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

export interface IUserNotInProject {
    id: number
    fullName: string
    phoneNumber: string
    email: string
    gender: Gender
    dob: Date
    address: string
    username: string
    role: UserRole
    userCreateId: null | number
    userProjects: any[]
    media?: Media
}

export interface IMetaData {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
}

export interface IPaginationUserInfor {
    items: IUserNotInProject[]
    meta: IMetaData
}
