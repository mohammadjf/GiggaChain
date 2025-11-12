import {z} from "zod";
import {requiredString} from "../util/util";

export const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    displayName: requiredString('displayName'),
    password: requiredString('password')
})

export type RegisterSchema = z.infer<typeof registerSchema>;