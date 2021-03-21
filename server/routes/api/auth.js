const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Example of a private route
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    await res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'The server crashed!' });
  }
});

// @route   POST api/auth
// @desc    Signin route
// @access  Public
router.post(
  '/',
  check('email', 'Field missing.').not().isEmpty(),
  check('password', 'Field missing.').not().isEmpty(),
  async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(400).send({ errors: [{ msg: 'Credentials incorrect.' }] });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).send({ errors: [{ msg: 'Credentials incorrect.' }] });

      const payload = { user: { id: user.id } };
      const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 * 10000 });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('The server crashed!');
    }
  },
);

module.exports = router;
