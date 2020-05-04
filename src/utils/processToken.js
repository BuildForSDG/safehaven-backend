import 'dotenv/config';
import jwt from 'jsonwebtoken';

/**
 *
 * @param {object} payload
 * @returns {string} token
 */
export const createToken = (payload) =>
	jwt.sign(payload, `${process.env.JWT_SECRET}`, {
		expiresIn: '8h'
	});

/**
 *
 * @param {string} token
 * @returns {object} verifiedToken
 */
export const verifyToken = (token) =>
	jwt.verify(token, `${process.env.JWT_SECRET}`, {
		expiresIn: '8h',
		algorithms: [
			'HS256'
		]
	});
