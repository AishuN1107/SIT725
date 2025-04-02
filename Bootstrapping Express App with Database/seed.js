const mongoose = require("mongoose");

// Define Schema and Model directly in this file
const placeSchema = new mongoose.Schema({
  location: String,
  image: String,
  description: String
});

const Place = mongoose.model("Place", placeSchema);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/travelBlogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("DB Connection Error:", err));

const samplePlaces = [
  { location: "Paris, France", image: "images/paris.jpg", description: "The city of love and lights!" },
  { location: "Kyoto, Japan", image: "images/kyoto.jpg", description: "Beautiful temples and cherry blossoms." },
  { location: "Maui, Hawaii", image: "images/Maui.png", description: "Stunning beaches and tropical paradise." }
];

// Ensure database connection is established before inserting
mongoose.connection.once("open", async () => {
  try {
    await Place.insertMany(samplePlaces);
    console.log("Sample places added!");
    mongoose.connection.close(); // Close connection after inserting
  } catch (error) {
    console.log("Insert Error:", error);
  }
});
