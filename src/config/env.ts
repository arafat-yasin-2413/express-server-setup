import dotenv from 'dotenv';
import { envValidate } from './env.validate.js';

dotenv.config()

const envVariables = envValidate();

export const env = {
    port : envVariables.PORT,
    nodeEnv: envVariables.NODE_ENV,
}