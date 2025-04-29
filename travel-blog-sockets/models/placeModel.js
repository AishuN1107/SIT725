const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place;
