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
})

const ENV = envSchema.parse(process.env);
export default ENV;