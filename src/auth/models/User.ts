import mongoose from "mongoose";
import { ROLES } from "../../common/enums";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: 'USER' },
    address: {
        phoneNumber: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pinCode: { type: Number, max: 6, min: 6 },
    },
    is_active: { type: Boolean, default: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    this.name = this.firstName + ' ' + this.lastName;

    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema);