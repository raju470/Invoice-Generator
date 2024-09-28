import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { emailRegex, usernameRegex, passwordRegex } from '../constants/validationPatterns.js';
import { messages } from '../constants/messages.js';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, messages.validation.username],
        validate: {
            validator: function (value) {
                return usernameRegex.test(value);
            },
            message: messages.validation.username
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return emailRegex.test(value);
            },
            message: messages.validation.email
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return passwordRegex.test(value);
            },
            message: messages.validation.password
        }
    }
}, {
    timestamps: true
});

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

export const User = mongoose.model('User', UserSchema);
