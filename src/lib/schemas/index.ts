import { Gender, UserRole } from '@/types/enums'
import { z } from 'zod'

const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const fileSchema = z.custom<File>(
    (file) => {
        return file instanceof File
    },
    {
        message: 'Image is required',
    }
)

const allowedFileTypes = [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/pdf',
    'text/plain',
];


export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})

export const projectSchema = z.object({
    projectName: z
        .string({
            required_error: 'Project name is required',
        })
        .min(3, {
            message: 'Project name at least 3 characters',
        }),
    description: z
        .string({
            required_error: 'Project description is required',
        })
        .min(20, {
            message: 'Project description at least 20 characters',
        }),
    logo: fileSchema.optional(),
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
    role: z.enum([UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.MANAGER], {
        required_error: 'Role is required',
        invalid_type_error:
            'Role must be one of the following values: ADMIN, EMPLOYEE, MANAGER',
    }),
})

export const updateUserSchema = z.object({
    gender: z.enum([Gender.FEMALE, Gender.MALE, Gender.OTHER], {
        required_error: 'Gender is required',
        invalid_type_error:
            'Gender must be one of the following values: MALE, FEMALE, OTHER',
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
})

export const passwordSchema = z
    .object({
        oldPassword: z
            .string({
                required_error: 'Old password is required',
            })
            .min(1, {
                message: 'Old password is required',
            }),
        password: z
            .string({
                required_error: 'Password is required',
            })
            .min(8, {
                message: 'Password at least 8 characters',
            })
            .regex(passwordRegex, {
                message:
                    'Password must contain uppercase, lowercase letter, numbers and special characters',
            }),
        confirm: z
            .string({
                required_error: 'Confirm password is required',
            })
            .min(8, {
                message: 'Confirm password at least 8 characters',
            })
            .regex(passwordRegex, {
                message:
                    'Password must contain uppercase, lowercase letter, numbers and special characters',
            }),
    })
    .refine((values) => values.password === values.confirm, {
        path: ['confirm'],
        message: 'Passwords do not match',
    })

export const knowledgeSchema = z.object({
    knowledgeName: z
        .string({
            required_error: 'Knowledge name is required',
        })
        .min(3, {
            message: 'Knowledge name at least 3 characters',
        }),
    image: fileSchema.refine((file) => file !== undefined, {
        message: 'Image file is required',
    }),
})


export const documentSchema = z.object({
    files: z.array(
        z.instanceof(File).refine(file => allowedFileTypes.includes(file.type), {
            message: "Invalid file type. Only Word, Excel, PPT, PDF, and TXT files are allowed."
        })
    ).nonempty('At least one file is required'),
});

export const documentGroupSchema = z.object({
    parent: z.number(),
    name: z.string({
        required_error: "Document group must have a name"
    }).min(1, {
        message: "Document group must have a name"
    })
})


export const blogSchema = z.object({
    title: z
        .string({
            required_error: 'Blog title is required',
        })
        .min(6, {
            message: 'Blog title at least 6 characters',
        }),
    content: z
        .string({
            required_error: 'Blog content is required',
        })
        .min(6, {
            message: 'Blog content at least 20 characters',
        }),
    hashTags: z.array(z.string()).optional(),
    media: z.array(
        z.instanceof(File)
    ).max(5, {
        message: "Can't upload more than 5 media"
    }),
});
