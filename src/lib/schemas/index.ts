import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
})

export const projectSchema = z.object({
    projectName: z.string({
        required_error: "Project name is required"
    }).min(6, {
        message: "Project name at least 6 characters"
    }),
    description: z.string({
        required_error: "Project description is required"
    }).min(20, {
        message: "Project description at least 20 characters"
    }),
});