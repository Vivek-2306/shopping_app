import { compare, hash } from "bcrypt";
import User from "../models/User";
import { CreateUserType, UpdateUserType } from "../types/users.types";
import { ConflictError, NotFoundError } from "../utils/errorHandler";

export class UserService {
    static async create(userData: CreateUserType): Promise<User> {
        return await User.create({
            ...userData,
            name: `${userData?.firstName} ${userData?.lastName}`,
            isVerified: false,
            isActive: true,
            createdBy: userData?.email,
            updatedBy: userData?.email
        });
    }

    static async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    static async findById(id: string): Promise<User | null> {
        return await User.findByPk(id);
    }

    static async update(id: string, userData: UpdateUserType): Promise<User | null> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (userData.email && userData.email !== user.email) {
            const existingUser = await User.findOne({ where: { email: userData.email } });
            if (existingUser) {
                throw new ConflictError("User with this email already exists");
            }
        }

        user.email = userData.email;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.name = `${userData.firstName} ${userData.lastName}`;
        user.updatedBy = userData.email;

        await user.save();
        return user;
    }

    static async delete(id: string): Promise<void> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        await user.destroy();
    }

    static async verifyPassword(user: User, password: string): Promise<boolean> {
        return await compare(password, user.password);
    }

    static async getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: User[]; totalCount: number }> {
        const offset = (page - 1) * limit;
        const { count, rows } = await User.findAndCountAll({
            offset,
            limit,
            attributes: ['password'],
            order: [['createdAt', 'DESC']]
        });
        return { users: rows, totalCount: count };
    }
}