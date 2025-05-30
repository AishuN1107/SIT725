const mongoose = require("mongoose");
const Place = require("./models/placeModel");

mongoose.connect("mongodb://localhost:27017/travelBlogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const samplePlaces = [
  { location: "Paris, France", image: "images/paris.jpg", description: "The city of love and lights!" },
  { location: "Kyoto, Japan", image: "images/kyoto.jpg", description: "Beautiful temples and cherry blossoms." },
  { location: "Maui, Hawaii", image: "images/Maui.png", description: "Stunning beaches and tropical paradise." }
];

mongoose.connection.once("open", async () => {
  try {
    await Place.deleteMany({});
    await Place.insertMany(samplePlaces);
    console.log("Sample places added!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting sample data:", error);
  }
});
