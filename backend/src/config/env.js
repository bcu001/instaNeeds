import { config } from 'dotenv';
import z from "zod"

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const envSchema = z.object({
    PORT: z.string().transform(Number),
    NODE_ENV: z.string(),
    DB_URI: z.string(),
    DB_NAME:z.string(),
    JWT_EXPIRE_IN:z.string(),
    JWT_SECRET:z.string(),
    CLIENT_URL:z.string(),
    ACCESS_TOKEN_EXPIRE_IN:z.string(),
    REFRESH_TOKEN_EXPIRE_IN:z.string(),
    JWT_REFRESH_SECRET:z.string(),
    JWT_ACCESS_SECRET:z.string(),
})

const ENV = envSchema.parse(process.env);
export default ENV;