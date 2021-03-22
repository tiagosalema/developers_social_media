const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);

    if (!profile) return res.json({ msg: 'There is no profile for this user yet.' });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'The server crashed!' });
  }
});

// @route   POST api/profile
// @desc    Post/Update current user's profile
// @access  Private
router.post(
  '/',
  auth,
  check('status', 'Status is required.').not().isEmpty(),
  check('skills', 'Skills are required.').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      status,
      company,
      location,
      skills,
      website,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      bio,
      ...rest
    } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.user.id }).populate('user', [
        'name',
        'email',
      ]);

      if (!profile) profile = new Profile({ user: req.user.id });

      if (status) profile.status = status;
      if (company) profile.company = company;
      if (location) profile.location = location;
      if (skills) profile.skills = skills.split(',').map(x => x.trim());
      if (website) profile.website = website;
      if (bio) profile.bio = bio;

      const social = { youtube, twitter, instagram, linkedin, facebook };
      for (const [key, value] of Object.entries(social)) {
        if (value) profile.social[key] = value;
      }
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'The server has crashed' });
    }
  },
);

// @route   POST api/profile/experience
// @desc    Post/Update current user's experience
// @access  Private
router.post(
  '/experience',
  auth,
  check('title', 'Please, specify a title for your experience.').not().isEmpty(),
  check('company', 'Please, specify a company for your experience.').not().isEmpty(),
  check('from', 'Please, specify when your experience started.').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, company, location, from, to, current, description } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.user.id }).populate('user', [
        'name',
        'email',
      ]);
      const experience = { title, company, from };

      if (to) experience.to = to;
      if (location) experience.location = location;
      if (current) experience.current = current;
      if (description) experience.description = description;

      profile.experience.push(experience);
      await profile.save();
      const experienceWith_id = profile.experience[profile.experience.length - 1];
      res.json(experienceWith_id);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'The server has crashed' });
    }
  },
);

// @route   DELETE api/profile/experience
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:experience_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const filteredExperiences = profile.experience.filter(
      exp => exp._id.toString() !== req.params.experience_id,
    );
    profile.experience = filteredExperiences;
    profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'The server has crashed' });
  }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'The server has crashed' });
  }
});

// @route   GET api/profile/:user_id
// @desc    Get profile of user with id = user_id
// @access  Public
router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'avatar',
    ]);
    if (profile) {
      res.json(profile);
    } else {
      res.status(400).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') res.status(400).json({ message: 'Profile not found' });
    else res.status(500).json({ msg: 'The server has crashed' });
  }
});

// @route   DELETE api/profile
// @desc    Delete authenticatedprofile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    const { id: user_id } = req.user;
    await Profile.findOneAndDelete({ user: user_id });
    const user = await User.findOneAndDelete({ _id: user_id });
    if (user) res.send(`The user with email ${user.email} has been deleted.`);
    else res.status(400).json({ message: 'Profile not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'The server has crashed' });
  }
});

module.exports = router;
