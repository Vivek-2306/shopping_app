import { NextFunction, Request, Response } from "express";
import { AuthManager } from "../manager/AuthManager";
import { UserResponseType } from "../types/users.types";
import { parseDuration } from "../utils/parseDuration";
import { EnvConfig } from "../config/env-config";


export default class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const responseData: UserResponseType = await AuthManager.register(req, res);
            res.status(201).json(responseData);
        } catch (error: any) {
            console.error("Registration error:", error);
            res.status(error?.statusCode).json(error?.message || "An error occurred during registration");
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const responseData: UserResponseType = await AuthManager.login(req, res);
            res
                .cookie(
                    "access_token",
                    responseData.access_token,
                    { httpOnly: true, expires: new Date(Date.now() + parseDuration(EnvConfig.JWT_ACCESS_EXPIRES_IN)) }
                )
                .cookie(
                    "refresh_token",
                    responseData.refresh_token,
                    { httpOnly: true, expires: new Date(Date.now() + parseDuration(EnvConfig.JWT_REFRESH_EXPIRES_IN)) }
                )
                .status(200)
                .json(responseData);
        } catch (error: any) {
            console.error("Login error:", error);
            res.status(error?.statusCode || 500).json(error?.message || "An error occurred during login");
        }
    }
}