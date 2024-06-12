import {z} from 'zod'

export const messageSchema = z.object({
    content: z
    .string()
    .min(10, "Content code must be alteast of 10 characters")
    .max(300, "Content code must be no longer than 300 characters")
})