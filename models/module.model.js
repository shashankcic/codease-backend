const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let moduleSchema = new Schema(
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
    },
    categoryName: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceCurrency: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    durationUnit: {
      type: String,
      required: true,
    },
    ratingCount: {
      type: Number,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    ideLink: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Module =  mongoose.model('Module', moduleSchema);

module.exports = Module;