import jwt from 'jsonwebtoken';
import { EnvConfig } from '../config/env-config';

interface TokenPayload {
    userId: string;
    email: string;
    [key: string]: any;
}

export class JWTService {
    private static readonly SECRET_KEY: string = EnvConfig.JWT_SECRET_KEY;
    private static readonly EXPIRES_IN: string = EnvConfig.JWT_EXPIRES_IN as string;

    static generateToken(payload: TokenPayload): string {
        return jwt.sign(payload, this.SECRET_KEY, {
            expiresIn: '1h'
        });
    }

    static verifyToken(token: string): TokenPayload {
        return jwt.verify(token, this.SECRET_KEY) as TokenPayload;
    }

    static decodeToken(token: string): TokenPayload | null {
        try {
            return jwt.decode(token) as TokenPayload;
        } catch (error) {
            return null;
        }
    }
}