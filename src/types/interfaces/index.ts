import { Media } from '..'
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
    role: UserRole
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

export interface IUpdateUserForm {
    gender: Gender
    address: string
    phoneNumber: string
}

export interface IPasswordForm {
    oldPassword: string,
    password: string,
    confirm: string
}
