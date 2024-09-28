import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { messages } from '../constants/messages.js';
import { statusCodes } from '../constants/statusCodes.js';
import { config } from '../config/config.js';

// Register a new user
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (user) {
            if (user.email === email) {
                return res.status(statusCodes.BAD_REQUEST).json({ msg: messages.auth.emailExists });
            }
            if (user.username === username) {
                return res.status(statusCodes.BAD_REQUEST).json({ msg: messages.auth.usernameExists });
            }
        }

        user = new User({ username, email, password: password });
        await user.save();

        // Generate JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry });

        res.status(statusCodes.CREATED).json({ token });
    } catch (err) {
        console.error(err.message);
        if (err.name === 'ValidationError') {
            const firstError = Object.values(err.errors)[0];
            const formattedMessage = firstError.message
                .replace('Path ', '')
                .replace(/`/g, '');
            return res.status(statusCodes.BAD_REQUEST).json({ msg: formattedMessage });
        }
        res.status(statusCodes.SERVER_ERROR).send(messages.server.error);
    }
};

// Login an existing user
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(statusCodes.BAD_REQUEST).json({ msg: messages.auth.invalidCredentials });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(statusCodes.BAD_REQUEST).json({ msg: messages.auth.invalidCredentials });
        }

        // Generate JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiry });

        res.status(statusCodes.OK).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(statusCodes.SERVER_ERROR).send(messages.server.error);
    }
};
