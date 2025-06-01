import { UUID } from "crypto";

export interface CreateUserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UpdateUserType {
    id: UUID;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserResponseType {
    token?: string;
    user: {
        id: UUID;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        isVerified: boolean;
        isActive: boolean;
        created_by?: string;
        updated_by?: string;
        created_at: Date;
        updated_at: Date;
    }
}