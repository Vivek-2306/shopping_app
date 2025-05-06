import { User } from "../models/User";
import status from "http-status";

export const validateRegisterUser = async (req: any, response: any) => {
    const email = req.body.email;
    const user = await User.findOne({email})
    if(user){
        return response.status(status.BAD_REQUEST).json({ message: `User already exists with this email: ${email}. Try with new one` });
    }
}