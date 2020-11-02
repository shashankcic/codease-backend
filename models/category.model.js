const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema(
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
    description: {
      type: String,
      required: true,
    },
    learningPathName: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Category =  mongoose.model('Category', categorySchema);

module.exports = Category;