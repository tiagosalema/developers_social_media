const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  date: { type: Date, default: Date.now() },
  posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
});

module.exports = model('user', userSchema);
