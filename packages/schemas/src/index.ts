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

export const createRoomSchema = z.object({
    slug : z.string().min(2, {message : "Room name should be at least of 2 characters"})
})

export const addShapeSchema = z.object({
    type : z.enum(["RECTANGLE", "CIRCLE", "LINE"]),
    width : z.number({message : "width should be number"}),
    height : z.number({message : "height should be number"}),
    x : z.number(),
    y : z.number(),
    radius : z.number(),
    endx : z.number(),
    endy : z.number(),
    strokeColor : z.string()
})
