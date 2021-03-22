const express = require('express');
const Post = require('../../models/Post');
const User = require('../../models/User');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const auth = require('../../middleware/auth');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', ['name', 'avatar']);
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'The server has crashed' });
  }
});

// @route     POST api/posts
// @desc      Create a post
// @access    Private
// @returns   { created_post }
router.post(
  '/',
  auth,
  check('text', 'Please, write something in your post').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select(['-password']);
      const post = new Post({
        text: req.body.text,
        user: req.user.id,
      });
      await Post.populate(post, ['user']);
      await post.save();

      user.posts.push(post); // pushes ObjectId
      user.save();
      return res.json(post);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: 'The server has crashed. Check the console for logged errors.' });
    }
  },
);

// @route     DELETE api/posts
// @desc      Delete all posts
// @access    Private
// @returns   { deleted_post } | null
router.delete('/:postId', auth, async (req, res) => {
  try {
    const { postId } = req.params;

    // removes the post ObjectId from the user posts array
    const user = await User.findById(req.user.id);
    user.posts = user.posts.filter(post => post.toString() !== postId);
    user.save();

    const post = await Post.findByIdAndDelete(postId);
    return res.json(post);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: 'The server has crashed. Check the console for logged errors.' });
  }
});

// @route     POST api/posts/likes/:id
// @desc      Update a post
// @access    Private
// @returns   { updated_post }
router.post('/likes/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  const { id: userId } = req.user;
  const { isLikedByUser } = req.body;
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId).select(['-password']);
    if (isLikedByUser > -1) {
      // remove like
      const postPosition = user.likes.indexOf(postId);
      post.likes.splice(isLikedByUser, 1);
      user.likes.splice(postPosition, 1);
    } else {
      // add like
      post.likes.push({ user: userId });
      user.likes.push({ post: postId });
    }
    post.save();
    user.save();

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: 'The server has crashed. Check the console for logged errors.' });
  }
});

module.exports = router;
