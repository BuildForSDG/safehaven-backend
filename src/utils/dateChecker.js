const checkExpiredToken = (tokendate) => {
  const createdAT = new Date(tokendate.toString());
  const presentdate = new Date();
  const diff = Math.abs(parseInt((createdAT - presentdate) / (1000 * 60 * 60 * 24), 10));
  return diff;
};

module.exports = { checkExpiredToken };
