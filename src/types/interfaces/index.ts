import { Gender, UserRole } from "../enums";

export interface ErrorResponse extends Error {
    response: {
        data: {
            message: string;
            status: number;
        };
        status: number;
    };
}

export interface IUserSignIn {
    username: string;
    password: string;
}

export interface IProjectForm {
    projectName: string;
    description: string;
}

export interface ICreateUserForm {
    fullName: string,
    phoneNumber: string,
    email: string,
    gender: Gender,
    dob: Date,
    address: string,
    username: string,
    password: string,
    roles: UserRole,
}