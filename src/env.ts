import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  // SMTP_HOST: z.string().min(1),
  // SMTP_PORT: z.coerce.number().positive(),
  // SMTP_USER: z.string().min(1),
  // SMTP_API_KEY: z.string().min(1),
  // EMAIL_FROM: z.string().min(1).email(),
  KINDE_CLIENT_ID: z.string().min(1),
  KINDE_CLIENT_SECRET: z.string().min(1),
  KINDE_ISSUER_URL: z.string().min(1),
  KINDE_SITE_URL: z.string().min(1),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string().min(1),
  KINDE_POST_LOGIN_REDIRECT_URL: z.string().min(1),
})

export const env = envSchema.parse(process.env)
