import {NextFunction, Request, Response} from 'express';
import { registerUser } from '../service/UserService';
import status from 'http-status'

export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = req.body;
        const user = await registerUser(userData);
        res.status(status.CREATED).json({ message: "User registered successfully", user });
    } catch (error: any) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message });
        next(error);
    }
}