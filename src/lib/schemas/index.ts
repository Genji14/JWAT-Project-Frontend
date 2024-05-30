import { Gender, UserRole } from '@/types/enums'
import { z } from 'zod'

const currentDate = new Date()

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})

export const projectSchema = z.object({
    projectName: z
        .string({
            required_error: 'Project name is required',
        })
        .min(6, {
            message: 'Project name at least 6 characters',
        }),
    description: z
        .string({
            required_error: 'Project description is required',
        })
        .min(20, {
            message: 'Project description at least 20 characters',
        }),
})

export const createUserSchema = z.object({
    fullName: z
        .string({
            required_error: "Employee's full name is required",
        })
        .min(6, {
            message: 'Full name at least 6 characters',
        })
        .max(60, {
            message: "Full name isn't longer than 60 characters",
        }),
    phoneNumber: z
        .string({
            required_error: "Employee's phone number is required",
        })
        .min(10, {
            message: 'Phone number at least 10 characters',
        })
        .max(12, {
            message: "Phone number isn't longer than 12 characters",
        }),
    email: z
        .string({
            required_error: "Employee's email is required",
        })
        .email({
            message: 'Invalid email address',
        }),
    gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.OTHER], {
        required_error: 'Gender is required',
        invalid_type_error:
            'Gender must be one of the following values: MALE, FEMALE, OTHER',
    }),
    dob: z.date({
        required_error: 'Date of birth is required',
        invalid_type_error: 'Date of birth must be a valid date',
    }),
    address: z
        .string({
            required_error: "Employee's address is required",
        })
        .min(10, {
            message: 'Address at least 10 characters',
        })
        .max(80, {
            message: "Address isn't longer than 80 characters",
        }),
    username: z
        .string({
            required_error: 'Username is required',
        })
        .min(6, {
            message: 'Username at least 6 characters',
        })
        .max(20, {
            message: "Username isn't longer than 20 characters",
        }),
    password: z.string({
        required_error: 'Password is required',
    }),
    roles: z.enum([UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.MANAGER], {
        required_error: 'Role is required',
        invalid_type_error:
            'Role must be one of the following values: ADMIN, EMPLOYEE, MANAGER',
    }),
})
