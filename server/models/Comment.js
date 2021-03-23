const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'comment',
    default: null,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('comment', commentSchema);
