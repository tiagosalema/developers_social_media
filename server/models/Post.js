const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  comments: [
    {
      text: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: 'user' },
      date: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  likes: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'user' },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = model('post', postSchema);
