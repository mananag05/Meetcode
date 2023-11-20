const express = require("express");
const router = express.Router();
const {getallprobs,getspecprob,createproblem,createauth} = require("../controllers/problems")
const { checkcreate } = require("../middlewares/middleware");

router.get("/all", getallprobs);

router.get("/:id", getspecprob);
  
router.post("/create", checkcreate, createproblem);

router.get("/create/auth", createauth);

module.exports = router;
