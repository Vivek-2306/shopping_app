import { Sequelize, DataTypes, Model, Optional} from "sequelize";
import sequelize from "../config/db-config";
import { UUID } from "crypto";

interface UserAttributes {
    id: UUID;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: UUID;
    public firstName!: string;
    public lastName!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public isVerified!: boolean;
    public isActive!: boolean;
    public createdBy?: string;
    public updatedBy?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: {type: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdBy: { type: DataTypes.STRING, allowNull: true },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    sequelize: sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    indexes: [
        {fields: ['email'], unique: true},
        {fields: ['name']}
    ]
})

export default User;