import { z } from "zod";

export const signUpSchema = z.object({
    username : z.string().min(3, {message : "Username Must Be at least of 3 characters"}),
    email : z.string().email({message : "Email should be valid"}),
    password : z.string().min(6, {message : "Password must be at least of 6 characters"}),
})
export const signInSchema = z.object({
    username : z.string(),
    password : z.string(),
})
