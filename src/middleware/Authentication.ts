import { NextFunction, Request, Response } from "express";
import UserDao from "../auth/UserDao";
import status from "http-status";

const userDao = new UserDao();

export const authentication = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization as string;
    const id: string = Array.isArray(req?.headers?.uid) ? req.headers.uid[0] : req?.headers?.uid || '';
    const user = await userDao.getUserById(id);

    const password = user.password as string;

    // validate token

    // validate password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(status.UNAUTHORIZED).json({ message: "Invalid password. Please check again." });
    }
    next();

}