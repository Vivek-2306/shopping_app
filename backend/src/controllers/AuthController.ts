import { NextFunction, Request, Response } from "express";
import { AuthManager } from "../manager/AuthManager";
import { UserResponseType } from "../types/users.types";


export default class AuthController {
    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const responseData: UserResponseType = await AuthManager.register(req, res);
            res.status(201).json(responseData);
        } catch (error) {
            throw error;
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const responseData: UserResponseType = await AuthManager.login(req, res);
            res.status(200).cookie("token", responseData.token).json(responseData)
        } catch (error) {
            throw error;
        }
    }
}