const express = require("express");
const router = express.Router();
const val = require("./../models/propertyModel");

router.get("/", async (req, res) => {
  try {
    const values = await val.find();
    res.status(200).json({
      message: " fetched",
      data: values,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      error: failed,
      details: error.message,
    });
  }
});

module.exports = router;
