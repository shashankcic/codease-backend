const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blogSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    aId: {
      type: String,
      required: true,
    },
    commentCount: {
      type: Number,
    },
    comments: {
      type: [String],
    },
    claps: {
      type: Number,
    },
    text: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Blog =  mongoose.model('Blog', blogSchema);

module.exports = Blog;