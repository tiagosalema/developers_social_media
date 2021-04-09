const User = require('../../server/models/User');

module.exports = () => {
  return new User({
    name: 'User name',
    password: '123456',
    email: `test_user-${Math.random()}@email.com`,
  }).save();
};
