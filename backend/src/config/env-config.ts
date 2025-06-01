import dotenv from 'dotenv'
dotenv.config()

export const EnvConfig = {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h'
}