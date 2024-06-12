import {z} from 'zod'

export const isAcceptingMessageSchema = z.object({
    acceptMEssages: z.boolean()
})