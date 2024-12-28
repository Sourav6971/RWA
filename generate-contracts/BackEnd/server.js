const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("../BackEnd/routes/auth");
const bodyParser = require("body-parser");
const deployRoute = require("../server/routes/deployRoute");
const properties = require("./routes/fetchDetails");
const item = require("./routes/propertyFetch");

dotenv.config();

const app = express();

// Use the middleware for CORS and JSON parsing
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json()); // or bodyParser.json(), if you're not using Express 4.16.0 or later

// Set up a basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Real Estate Tokenization API");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use auth routes for /api/auth endpoint
app.use("/api/auth", authRoutes);
//
app.use("/api/deploy", deployRoute);

app.use("/api/properties", properties);

app.use("/api/payment", item);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
