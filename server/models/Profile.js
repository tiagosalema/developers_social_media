const { Schema, model } = require('mongoose');

const REQUIRED_STRING = { type: String, required: true };
const DATE = { type: Date };
const REQUIRED_DATE = { type: Date, required: true };
const BOOLEAN = { type: Boolean, default: false };

const profileSchema = new Schema({
  status: REQUIRED_STRING,
  skills: { type: [String], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  company: String,
  website: String,
  location: String,
  bio: String,
  githubusername: String,
  experience: [
    {
      title: REQUIRED_STRING,
      company: REQUIRED_STRING,
      location: String,
      from: REQUIRED_DATE,
      to: DATE,
      current: BOOLEAN,
      description: String,
    },
  ],
  social: {
    youtube: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    instagram: String,
  },
  date: { type: Date, default: Date.now },
});

module.exports = model('profile', profileSchema);
