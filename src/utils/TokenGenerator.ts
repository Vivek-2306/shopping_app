import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_ACCESS_TOKEN_EXPIRES_IN = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string, 10);
const JWT_REFRESH_TOKEN_EXPIRES_IN = parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string, 10);

export const generateToken = (payload: any) => {
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN });
    return { accessToken, refreshToken };
}