import bcrypt from 'bcryptjs';

/**
 * Encrypts password to store in db
 * @param password
 */
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

/**
 * Compare inserted password with encrypted stored password
 * @param hashed
 * @param password
 */
export const comparePassword = (hashed, password) => bcrypt.compareSync(hashed, password);
