import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { messages } from '../constants/messages.js';
import { statusCodes } from '../constants/statusCodes.js';

export default function (req, res, next) {
  let token = req.header('Authorization');

  // If no token in header, check the query parameter
  if (!token) {
    token = req.query.Authorization;
  }

  if (!token) {
    return res.status(statusCodes.UNAUTHORIZED).json({ msg: messages.auth.authDenied });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(statusCodes.UNAUTHORIZED).json({ msg: messages.auth.tokenNotValid });
  }
}
