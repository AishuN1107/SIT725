const placeService = require("../services/placeService");

exports.getPlaces = async (req, res) => {
  try {
    const places = await placeService.getAllPlaces();
    res.json({ statusCode: 200, data: places, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error fetching places" });
  }
};

exports.createPlace = async (req, res) => {
  try {
    await placeService.createPlace(req.body);
    res.json({ statusCode: 201, message: "Place added successfully" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error saving place" });
  }
};
