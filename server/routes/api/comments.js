const express = require('express');
const { check, validationResult } = require('express-validator');

const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');

const router = express.Router();

// @route     GET api/comments?:query=:id
// @desc      Fetches all comments (either from user or post)
// @access    Public
// @body      { userId: string | postId: string }
// @returns   [{ comment }]
router.get('/', async (req, res) => {
  const { userId, postId } = req.query;
  try {
    let commments;
    if (userId) {
      // fetching user comments
      comments = await Comment.find({ user: userId }, 'text');
    } else if (postId) {
      // fetching post comments
      comments = await Comment.find({ post: postId }, 'text date').populate('user', 'name avatar');
    } else {
      res.status(404).json({
        error: 'You need to provide either a userId or a postId in the body of the request.',
      });
      return;
    }
    res.json(comments);
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ msg: 'The server has crashed. Check the console for logged errors.' });
  }
});

// @route     POST api/comments
// @desc      Add comment
// @access    Private
// @body      { text: string, postId: string }
// @returns   { created_post }
router.post(
  '/',
  auth,
  check('text', 'Please, write something in your comment').not().isEmpty(),
  check('postId', 'Please, provide a postId').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { text, postId } = req.body;
    const { id: userId } = req.user;
    try {
      const user = await User.findById(userId);
      const post = await Post.findById(postId);

      if (typeof post === 'undefined') {
        res.status(404).json({ error: 'There is no post with id ' + postId });
        return;
      } else if (typeof user === 'undefined') {
        res.status(404).json({ error: 'There is no user with id ' + userId });
        return;
      }

      const newComment = new Comment({ text, user: userId, post: postId });
      let createdComment = await newComment.save();
      post.comments.push(newComment);
      user.comments.push(newComment);
      await post.save();
      await user.save();

      createdComment = await createdComment.execPopulate({ path: 'user', select: 'name avatar' });
      return res.json(createdComment);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ msg: 'The server has crashed. Check the console for logged errors.' });
    }
  },
);

// @route     DELETE api/comments/:commentId
// @desc      Delete comment
// @access    Private
// @returns   { success: 'true' }
router.delete('/:commentId', auth, async (req, res) => {
  const { id: userId } = req.user;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      res.status(404).json({ error: 'No such comment with that id.' });
    }
    let deletedComment;
    if (comment.user.toString() === userId) {
      deletedComment = await Comment.findOneAndDelete({ _id: commentId });
    } else {
      res.status(403).json({ error: "You sneaky... This comment isn't yours to delete." });
      return;
    }
    return res.json({ message: 'Comment deleted.', deletedComment });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: 'The server has crashed. Check the console for logged errors.' });
  }
});

module.exports = router;

/**
user: 604283d71dc3dc7abb0d6473
post: 6057dd323fcf72b84f64e9bd
 */
