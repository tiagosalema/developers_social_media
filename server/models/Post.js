const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
  likes: {
    users: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
      },
    ],
    count: { type: Schema.Types.Number, default: 0 },
  },
  date: { type: Date, default: Date.now },
});

module.exports = model('post', postSchema);
