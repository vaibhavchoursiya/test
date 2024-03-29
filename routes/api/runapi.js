const express = require("express");
const router = express.Router();
const { getCode } = require("../../controllers/apiControllers");

router.post("/run", getCode);

router.post("/save", (req, res) => {});

module.exports = router;
