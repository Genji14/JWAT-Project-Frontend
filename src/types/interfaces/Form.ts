import { Gender, UserRole } from "../enums"

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

export interface IUpdateUserForm {
    gender: Gender
    address: string
    phoneNumber: string
}


export interface IProjectForm {
    projectName: string
    description: string
    logo: File | undefined
}


export interface IChangePasswordForm {
    oldPassword: string,
    password: string,
}

export interface IPasswordForm extends IChangePasswordForm {
    confirm: string
}
