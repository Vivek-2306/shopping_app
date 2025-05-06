import { User } from "../models/User";

export const registerUser = async (userData: any) => {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error: any) {
        throw new Error("Error registering user: " + error.message);
    }
}