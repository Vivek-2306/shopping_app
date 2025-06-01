import { NextFunction, Request, Response } from "express";
import { JWTService } from "../utils/generateJwtToken";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized! Invalid Token." });
    }

    try {
        const decoded = JWTService.verifyToken(token);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token or expired token." });
    }

}