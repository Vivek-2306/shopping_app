import jwt from 'jsonwebtoken';
import { EnvConfig } from '../config/env-config';

interface TokenPayload {
    email: string;
    [key: string]: any;
}

export class JWTService {

    static generateToken(payload: TokenPayload, secret_key: string, expires_in: any): string {
        return jwt.sign(payload, secret_key, {
            expiresIn: expires_in,
        });
    }

    static verifyToken(token: string, secret_key: string): TokenPayload {
        return jwt.verify(token, secret_key) as TokenPayload;
    }

    static decodeToken(token: string): TokenPayload | null {
        try {
            return jwt.decode(token) as TokenPayload;
        } catch (error) {
            return null;
        }
    }
}