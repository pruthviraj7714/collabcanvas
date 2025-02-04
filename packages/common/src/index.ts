import { config } from 'dotenv';
config();

export const JWT_SECRET = process.env.JWT_SECRET;

export const BACKEND_URL = process.env.BACKEND_URL;

export const WS_URL = process.env.WS_URL;

console.log(process.env.JWT_SECRET);
console.log(process.env.BACKEND_URL);
