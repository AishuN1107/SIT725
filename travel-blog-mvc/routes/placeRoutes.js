const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.get("/", placeController.getPlaces);
router.post("/", placeController.createPlace);

module.exports = router;
