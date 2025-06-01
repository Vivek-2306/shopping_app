import dotenv from 'dotenv'
dotenv.config()

export const EnvConfig = {
    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY || '',
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY || '',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}