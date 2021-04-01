const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
var jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

const jwtSecret = process.env.jwtSecret || config.get('jwtSecret');

// @route   POST api/users
// @desc    Signup route
// @access  Public
router.post(
  '/',
  check('name', 'Name is required.').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must have 6 characters or more.').isLength({ min: 6 }),
  async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      let user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .send({ errors: [{ msg: 'A user with that email already exists.' }] });

      const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      user = new User({ name, email, password, avatar });

      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hashSync(password, salt);

      await user.save();

      const payload = { user: { id: user.id } };
      const token = await jwt.sign(payload, jwtSecret, { expiresIn: 3600 * 10000 });

      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('The server crashed!');
    }
  },
);

// @route   GET api/users
// @desc    Gets all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    let users = await User.find();
    res.json({ users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('The server crashed!');
  }
});

// @route   GET api/users/posts
// @desc    Delete all user posts
// @access  Private
router.delete('/posts', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.posts = [];
    user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.json('The server crashed. Check your console for more details.');
  }
});

module.exports = router;
