const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/travelBlog", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Define a schema and model for Travel Place
const travelPlaceSchema = new mongoose.Schema({
    location: String,
    image: String,
    description: String
});

const TravelPlace = mongoose.model("TravelPlace", travelPlaceSchema);

// API route to get all travel places
app.get("/api/travel-places", async (req, res) => {
    try {
        const places = await TravelPlace.find();
        res.json({ statusCode: 200, data: places });
    } catch (err) {
        console.error("Error fetching places:", err);
        res.status(500).json({ statusCode: 500, message: "Error fetching places" });
    }
});

// API route to add a new travel place
app.post("/api/travel-places", async (req, res) => {
    const { location, image, description } = req.body;

    if (!location || !image || !description) {
        return res.status(400).json({ statusCode: 400, message: "All fields are required" });
    }

    try {
        const newPlace = new TravelPlace({ location, image, description });
        await newPlace.save();
        res.status(201).json({ statusCode: 201, data: newPlace });
    } catch (err) {
        console.error("Error adding new place:", err);
        res.status(500).json({ statusCode: 500, message: "Error adding new place" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Travel Blog server listening at http://localhost:${port}`);
});