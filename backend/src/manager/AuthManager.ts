import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errorHandler";
import { JWTService } from "../utils/generateJwtToken";
import { UserResponseType } from "../types/users.types";
import { EnvConfig } from "../config/env-config";

export class AuthManager {
    static async register(req: Request, res: Response): Promise<UserResponseType> {
        const { email, password, firstName, lastName } = req.body;
        try {
            const emailExists = await UserService.findByEmail(email);
            if (emailExists) {
                throw new ConflictError("User with this email already exists");
            }

            const hashedPassword = await UserService.hashPassword(password);
            const user = await UserService.create({
                email,
                password: hashedPassword,
                firstName,
                lastName
            });

            return {
                user: {
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    is_verified: user.is_verified,
                    is_active: user.is_active,
                    created_by: user.created_by,
                    updated_by: user.updated_by,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            }

        } catch (error) {
            console.error("Registration error:", error);
            throw error instanceof ConflictError ? error : new InternalServerError("An error occurred during registration");
        }
    }


    static async login(req: Request, res: Response): Promise<UserResponseType> {
        const { email, password } = req.body;
        try {
            const user = await UserService.findByEmail(email);
            if (!user) {
                throw new NotFoundError("User not found");
            }

            const isPasswordValid = await UserService.verifyPassword(user, password);
            if (!isPasswordValid) {
                throw new UnauthorizedError("Invalid email or password");
            }

            const accessToken = JWTService.generateToken({
                userId: user.id,
                email: user.email,
            }, EnvConfig.JWT_ACCESS_SECRET_KEY, EnvConfig.JWT_ACCESS_EXPIRES_IN);

            const refreshToken = JWTService.generateToken({
                userId: user.id,
                email: user.email,
            }, EnvConfig.JWT_REFRESH_SECRET_KEY, EnvConfig.JWT_REFRESH_EXPIRES_IN);

            return {
                access_token: accessToken,
                refresh_token: refreshToken,
                user: {
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    is_verified: user.is_verified,
                    is_active: user.is_active,
                    created_by: user.created_by,
                    updated_by: user.updated_by,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            };

        } catch (error) {
            console.error("Login error:", error);
            throw new InternalServerError("An error occurred during login");
        }
    }
}