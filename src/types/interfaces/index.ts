import { Gender, UserRole } from '../enums'

export interface IUserSignIn {
    username: string
    password: string
}

export interface IProjectForm {
    projectName: string
    description: string
}

export interface ICreateUserForm {
    fullName: string
    phoneNumber: string
    email: string
    gender: Gender
    dob: Date
    address: string
    username: string
    password: string
    roles: UserRole
}

export interface IUserInfo extends ICreateUserForm {
    avatar: string
    createdAt: Date
    updatedAt: Date
}

export interface IUpdateUserForm {
    gender?: Gender
    address?: string
    phoneNumber?: string
}