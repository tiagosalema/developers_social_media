const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

module.exports = async user => {
  const userObj = { user: { id: user.id } };
  const token = await jwt.sign(userObj, jwtSecret, { expiresIn: 3600 * 10000 });

  return token;
};
