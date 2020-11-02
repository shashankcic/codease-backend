const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorSchema = new Schema(
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
    work: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Author =  mongoose.model('Author', authorSchema);

module.exports = Author;