import { User } from "./models/User";

class UserDao {
    session: any = null;
    constructor(session?: any) {
        this.session = session || null;
    }

    async getUserById(id: string){
        return new Promise<any>((resolve, reject) => {
            User.findById(id)
            .then((user: any) => resolve(user))
            .catch((error: any) => reject(error));
        });
    }

    async getUserByEmail(email: string){
        return new Promise<any>((resolve, reject) => {
            User.findOne({email})
            .then((user: any) => resolve(user))
            .catch((error: any) => reject(error));
        });
    }

    async createUser(userData: any){
        return new Promise<any>((resolve, reject) => {
            User.create(userData)
            .then((user: any) => resolve(user))
            .catch((error: any) => reject(error));
        });
    }

    async updateUser(id: string, userData: any){
        return new Promise<any>((resolve, reject) => {
            User.findByIdAndUpdate(id, userData)
            .then((user: any) => resolve(user))
            .catch((error: any) => reject(error));
        });
    }

    async deleteUser(id: string){
        return new Promise<any>((resolve, reject) => {
            User.findByIdAndDelete(id)
            .then((user: any) => resolve(user))
            .catch((error: any) => reject(error));
        });
    }
}

export default UserDao;