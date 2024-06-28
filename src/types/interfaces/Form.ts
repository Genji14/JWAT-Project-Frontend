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

export interface IBlogForm {
    title: string
    content: string
    hashTags: string[]
    media: File[]
}

export interface IEditBlogForm extends IBlogForm {
    deleteMediaIds: number[]
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
    project: number
    users: number[]
}

export interface IRemoveUsersFromProjectForm {
    project: number
    users: number[]
}

// Document

export interface ICreateDocumentForm {
    files: File[]
}

export interface ICreateDocumentGroupForm {
    parent: number
    name: string
    documents: number[]
}

export interface ICreateCommentForm {
    blogId: number,
    content: string
}
