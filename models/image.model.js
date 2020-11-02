const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema(
  {
    imgName: {
        type: String,
    },
    imgPath: {
        type: String,
        default: '/assets/img/404/Astronaut.png'
    },
    errTitle: {
        type: String
    },
    errText: {
        type: String,
        default: 'Error 404'
    }
  },
  {
    timestamps: true,
  },
);

const Image =  mongoose.model('Image', imageSchema);

module.exports = Image;