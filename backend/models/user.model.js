import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is requried"],
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "user email is requried"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, '{VALUE} is not valid email'],
    },
    password: {
        type: String,
        required: [true, 'user password is required'],
        minlength: 6,
    },
    role: {
        type: String,
        required: [true, 'role of user is required'],
        enum: {
            values: ["admin", "customer"],
            message: '{VALUE} is not supported'
        },
        default: "customer"
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
export default User;