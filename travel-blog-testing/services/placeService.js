const Place = require("../models/placeModel");

const getAllPlaces = () => {
  return Place.find({});
};

const createPlace = (data) => {
  const newPlace = new Place(data);
  return newPlace.save();
};

module.exports = {
  getAllPlaces,
  createPlace,
};
