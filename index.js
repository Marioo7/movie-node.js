const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movies");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use("/movies", movieRoutes);

// Route to respond with "hello" at the root URL
app.get("/", (req, res) => {
  res.send("hello dear");
});

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://mariofathy20:Mario1234@devapi.pkxmp7u.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=DevAPI"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
