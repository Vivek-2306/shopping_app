import { Sequelize, DataTypes, Model, Optional, UUID } from "sequelize";
import sequelize from "../config/db-config";
import { v4 as uuidv4 } from "uuid";

interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
    is_verified: boolean;
    is_active: boolean;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public is_verified!: boolean;
    public is_active!: boolean;
    public created_by?: string;
    public updated_by?: string;

    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init({
    id: { type: DataTypes.UUID, primaryKey: true, allowNull: false, defaultValue: uuidv4() },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.STRING, allowNull: true },
    updated_by: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    sequelize: sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    indexes: [
        { fields: ['email'], unique: true },
        { fields: ['name'] }
    ]
})

export default User;