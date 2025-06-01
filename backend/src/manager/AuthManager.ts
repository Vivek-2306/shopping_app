import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../utils/errorHandler";
import { JWTService } from "../utils/generateJwtToken";
import { UserResponseType } from "../types/users.types";

export class AuthManager {
    static async register(req: Request, res: Response): Promise<UserResponseType> {
        const {email, password, firstName, lastName} = req.body;
        try {
            const emailExists = await UserService.findByEmail(email);
            if (emailExists) {
                throw new ConflictError("User with this email already exists");
            }
            
            const hashedPassword = JWTService.generateToken(password);
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
                    isVerified: user.isVerified,
                    isActive: user.isActive,
                    created_by: user.createdBy,
                    updated_by: user.updatedBy,
                    created_at: user.createdAt,
                    updated_at: user.updatedAt
                }
            }

        } catch (error) {
            throw new InternalServerError("An error occurred during registration");
        }
    }


    static async login(req: Request, res: Response): Promise<UserResponseType> {
        const {email, password} = req.body;
        try {
            const user = await UserService.findByEmail(email);
            if (!user) {
                throw new NotFoundError("User not found");
            }

            const isPasswordValid = await UserService.verifyPassword(password, user?.password);
            if (!isPasswordValid) {
                throw new UnauthorizedError("Invalid email or password");
            }
            
            const token = JWTService.generateToken({
                userId: user.id,
                email: user.email,
            });

            return {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    isVerified: user.isVerified,
                    isActive: user.isActive,
                    created_by: user.createdBy,
                    updated_by: user.updatedBy,
                    created_at: user.createdAt,
                    updated_at: user.updatedAt
                }
            };
            
        } catch (error) {
            console.error("Login error:", error);
            throw new InternalServerError("An error occurred during login");
        }
    }
}