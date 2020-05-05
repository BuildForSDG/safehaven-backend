/**
 *
 * @description magicTrimmer removes leading and trailing spaces from a string
 *
 */

export const magicTrimmer = (payload) => {
  let loaded = payload;
  const data = {};
  if (payload) {
    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      Object.assign(data, { [key]: value.trim() });
    });
    loaded = data;
  }
  return loaded;
};

/**
 *
 * @description inValidName is function which validates a name
 *
 * @param {name} name is the eniity you want to validate
 *
 * @param {value} value is the data yur want to validate
 *
 * @returns {boolean} return true or false
 */
export const inValidName = (name, value) => {
  if (!value) return `${name} are required`;
  if (!/^[A-Za-z0-9.-]+\s([A-Za-z0-9.-]+\s)?[A-Za-z0-9.-]+$/.test(value)) return `${name} - are required!!`;
  return null;
};
/**
 * @description inValidEmail is a function that validates an email
 *
 * @param {email} email is the data you want to verify if its a valid email
 *
 * @returns {string} string is type of data thr function returns
 */
export const inValidEmail = (email) => {
  let userEmail = email;
  if (!email) return 'email is required';
  userEmail = email.toLowerCase();
  if (!/^[A-Za-z0-9.-_]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(userEmail)) return 'email is not valid';
  return null;
};

/**
 *
 * @description inValidPassword is a function that validates a password
 *
 * @param {password} password is the data you want to validate whether it is alphanumeric
 *
 * @returns {string} string is the type of data the function returns
 */
export const inValidPassword = (password) => {
  if (!password) return 'password is required';
  if (password.length < 6) return 'password should be at least six characters';
  const x = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
  if (!x.test(password)) {
    return 'password should contain at least one Uppercase letter, one lowercase letter, and at least one digit, and one special character';
  }
  return null;
};

export const inValidInput = (name, text) => {
  if (!text) return `Input invalid, ${name} cannot be empty`;
  if (!/^.{4,100}$/.test(text)) return `${name} should be minimum of 5 characters and maximum of 100`;
};

export const emptyInput = (text) => {
  if (!text) return 'Input invalid, field cannot be empty';
};

export const validate = (obj) => {
  const result = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result[key] = obj[key];
    }
  });
  if (Object.keys(result).length) {
    return result;
  }
  return null;
};
