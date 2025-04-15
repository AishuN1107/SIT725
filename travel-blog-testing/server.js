const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/travelBlogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const placeRoutes = require("./routes/placeRoutes");
app.use("/api/places", placeRoutes);

app.listen(port, () => {
  console.log(`Travel Blog is running at http://localhost:${port}`);
});
