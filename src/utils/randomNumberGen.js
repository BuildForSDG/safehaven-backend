export default (name = '') => {
  const chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'];
  // eslint-disable-next-line no-bitwise,no-unused-vars
  const randCode = [...Array(6)].map(i => chars[Math.random() * chars.length | 0]).join``;
  if (name) {
    return `${name}-${randCode}`;
  }
  return randCode;
};
