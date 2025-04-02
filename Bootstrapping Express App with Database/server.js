const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/travelBlogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB!");
});

// Define Schema
const PlaceSchema = new mongoose.Schema({
  location: String,
  image: String,
  description: String,
});

const Place = mongoose.model("Place", PlaceSchema);

// API Endpoints
app.get("/api/places", async (req, res) => {
  try {
    const places = await Place.find({});
    res.json({ statusCode: 200, data: places, message: "Success" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Database error" });
  }
});

app.post("/api/places", async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    await newPlace.save();
    res.json({ statusCode: 201, message: "Place added successfully" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: "Error saving place" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Travel Blog is running at http://localhost:${port}`);
});
