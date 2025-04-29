const express = require('express');
const router = express.Router();
const placeController = require("../controllers/placeController");

// Route to get all places
router.get('/', placeController.getAllPlaces);

// Route to create a new place
router.post('/', placeController.createPlace);

module.exports = router;
