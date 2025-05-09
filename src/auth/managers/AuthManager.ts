import mongoose from "mongoose";
import DBConfig from "../../config/db";
import UserDao from "../UserDao";
import { generateToken } from "../../utils/TokenGenerator";

const userDao = new UserDao()

class AuthManager extends SuperManger {
    private session: mongoose.ClientSession | undefined = undefined;

    constructor(req?: any) {
        super(req);
    }

    async registerUser(){
        try {
            let db: mongoose.Connection = await DBConfig.getConnection();
            this.session = await db.startSession();
            this.session.startTransaction();
            let user = await userDao.getUserByEmail(this.body.email);
            if (user && user._id) {
                throw new Error("User already exists with this email: " + this.body.email);
            }
            if(!user && user._id){
                user = new UserDao(this.session).createUser(this.body)
            }
            await this.session.commitTransaction();
            return user
        } catch (error: any) {
            if (this.session) await this.session.abortTransaction();
            throw new Error("Error registering user: " + error.message);
        } finally {
            if (this.session) await this.session.endSession();
        }
    }

    async loginUser() {
        try {
            let user: any = await userDao.getUserByEmail(this.body.email);
            if(!user && user._id){
                throw new Error("User not found with this email: " + this.body.email);
            }
            const isValidPassword = await user.comparePassword(this.body.password);
            if (!isValidPassword) {
                throw new Error("Invalid password. Please check again.");
            }

            const token = generateToken({email: user.email, id: user._id, name: user.name})
            delete user.password;
            return {...user, ...token};
        } catch (error) {
            
        } finally {}
    }
}

export default AuthManager