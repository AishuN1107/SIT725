const Place = require('../models/placeModel');

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const { location, image, description } = req.body;
    const newPlace = new Place({ location, image, description });
    await newPlace.save();

    // Emit new place to all connected clients via socket.io
    const io = req.app.get('io');
    io.emit('new-place', newPlace);

    res.status(201).json(newPlace);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
