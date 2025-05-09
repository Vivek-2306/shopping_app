import { NextFunction, Request, Response } from "express";
import AuthManager from "../managers/AuthManager";
import status from "http-status";
import { cookieOptions } from "../../utils/CookieOptions";

class AuthController {
    constructor() {}

    async registerUser(req: Request, res: Response, next: NextFunction) {
        const result = await new AuthManager(req).registerUser();
        return res.status(status.CREATED).json({ message: "User registered successfully", result });
     };
    async loginUser(req: Request, res: Response, next: NextFunction) { 
        const {accessToken, refreshToken} = await new AuthManager(req).loginUser();
        return res.cookie(
            'refreshToken',
            refreshToken,
            cookieOptions({ dateOfExpiration: 60 * 60 * 24 })
        ).cookie(
            'accessToken',
            accessToken,
            cookieOptions({ dateOfExpiration: 60 * 60 * 24 })
        )
    };
}