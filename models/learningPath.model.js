const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let learningPathSchema = new Schema(
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
  },
  {
    timestamps: true,
  },
);

const LearningPath =  mongoose.model('LearningPath', learningPathSchema);

module.exports = LearningPath;