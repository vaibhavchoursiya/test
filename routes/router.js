const express = require("express");
const router = express.Router();
const path = require("path");
const { getExt } = require(path.join(__dirname, "..", "helper", "helper.js"));

// router.get("/c", (req, res) => {});
// router.get("/cpp", (req, res) => {});
// router.get("/java", (req, res) => {});
// router.get("/python", (req, res) => {});
// router.get("/ruby", (req, res) => {});

router.get("/:language", (req, res) => {
  const languageName = req.params.language;
  const ext = getExt(languageName);

  const data = {
    languageName: languageName,
    ext: ext,
  };

  res.render("oc.ejs", data);
});

module.exports = router;
