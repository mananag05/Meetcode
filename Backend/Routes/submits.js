const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/middleware");
const {submit} = require("../controllers/submit")
const {submission} = require("../controllers/submit")

  router.get("/:pid", auth, submission);
  
  router.post("/", auth, submit );

  module.exports = router;