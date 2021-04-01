const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    req.user = jwt.verify(token, jwtSecret).user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Incorrect token' });
  }
};
