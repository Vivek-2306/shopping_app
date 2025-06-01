
export interface CreateUserType {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UpdateUserType {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface UserResponseType {
    access_token?: string;
    refresh_token?: string;
    user: {
        id: string;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        is_verified: boolean;
        is_active: boolean;
        created_by?: string;
        updated_by?: string;
        created_at: Date;
        updated_at: Date;
    }
}