const express = require("express");
const router = express.Router();
const { getCode, saveCode } = require("../../controllers/apiControllers");
const authChecker = require("../../middleware/auth_middleware");

//Router Level MiddleWare
router.post("/save", authChecker);

router.post("/run", getCode);

router.post("/save", saveCode);

module.exports = router;
