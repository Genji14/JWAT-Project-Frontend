import { Gender, UserRole } from '../enums'

// Authentication
export interface ISignInForm {
    username: string
    password: string
}

// Update Profile
export interface IUpdateUserForm {
    gender: Gender
    address: string
    phoneNumber: string
}

export interface IChangePasswordForm {
    oldPassword: string
    password: string
}

export interface IPasswordForm extends IChangePasswordForm {
    confirm: string
}

// Create Project
export interface IProjectForm {
    projectName: string
    description: string
    logo: File | undefined
}

// Create Knowledge
export interface IKnowledgeForm {
    knowledgeName: string
    image: File
}

// Create User
export interface ICreateUserForm {
    fullName: string
    phoneNumber: string
    email: string
    gender: Gender
    dob: Date
    address: string
    username: string
    role: UserRole
}

export interface ICreateUserRequest extends ICreateUserForm {
    password: string
}


// Invite User 

export interface IAddUserToProjectForm {
    project: number,
    users: number[]
}