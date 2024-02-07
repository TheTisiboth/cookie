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
  BASIC_USER_EMAIL: z.string().min(1),
  BASIC_USER_PASSWORD: z.string().min(1),
  ADMIN_USER_EMAIL: z.string().min(1),
  ADMIN_USER_PASSWORD: z.string().min(1),
})

const parsedEnv = envSchema.parse(process.env)

type User = {
  email: string
  password: string
}

type Env = {
  DATABASE_URL: string
  KINDE: {
    CLIENT_ID: string
    CLIENT_SECRET: string
    ISSUER_URL: string
    SITE_URL: string
    POST_LOGOUT_REDIRECT_URL: string
    POST_LOGIN_REDIRECT_URL: string
  }
  BASIC_USER: User
  ADMIN_USER: User
}

export const env: Env = {
  DATABASE_URL: parsedEnv.DATABASE_URL,
  KINDE: {
    CLIENT_ID: parsedEnv.KINDE_CLIENT_ID,
    CLIENT_SECRET: parsedEnv.KINDE_CLIENT_SECRET,
    ISSUER_URL: parsedEnv.KINDE_ISSUER_URL,
    SITE_URL: parsedEnv.KINDE_SITE_URL,
    POST_LOGOUT_REDIRECT_URL: parsedEnv.KINDE_POST_LOGOUT_REDIRECT_URL,
    POST_LOGIN_REDIRECT_URL: parsedEnv.KINDE_POST_LOGIN_REDIRECT_URL,
  },
  BASIC_USER: {
    email: parsedEnv.BASIC_USER_EMAIL,
    password: parsedEnv.BASIC_USER_PASSWORD,
  },
  ADMIN_USER: {
    email: parsedEnv.ADMIN_USER_EMAIL,
    password: parsedEnv.ADMIN_USER_PASSWORD,
  },
}
