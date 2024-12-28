const express = require("express");
const router = express.Router();
const val = require("./../models/propertyModel");

router.post("/", async (req, res) => {
  const { id } = req.body; // Get ID from request body

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "ID is required in the request body!" });
    }

    const item = await val.findById(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found!" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Invalid ID format or Server Error" });
  }
});

module.exports = router;
