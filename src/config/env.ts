import dotenv from 'dotenv';
import { envValidate } from './env.validate.js';

dotenv.config()

const envVariables = envValidate();

export const env = {
    port : envVariables.PORT,
    nodeEnv: envVariables.NODE_ENV,
    databaseUrl: envVariables.DATABASE_URL,
    saltRound: envVariables.SALT_ROUND,
    smtpUser: envVariables.SMTP_USER,
    smtpPass: envVariables.SMTP_PASS,
    smtpHost: envVariables.SMTP_HOST,
    smtpPort: envVariables.SMTP_PORT,
    smtpFrom: envVariables.SMTP_FROM,
}