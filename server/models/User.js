import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100
        },
        email: {
            type: String,
            required: true,
            max: 100,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        transactions: Array,
        role: {
            type: String,
            enum: ["user", "admin", "superadmin"],
            default: "admin"
        }
    },
    {
        timestamps: true
    }
);

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;