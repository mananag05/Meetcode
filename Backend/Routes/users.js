const express = require("express");
const router = express.Router();
const {signup} = require("../controllers/User")
const {login} = require("../controllers/User")

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;