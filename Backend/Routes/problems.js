const express = require("express");
const router = express.Router();
const {getallprobs,getspecprob,createproblem} = require("../controllers/problems")

router.get("/all", getallprobs);

router.get("/:id", getspecprob);
  
router.post("/create", createproblem);

module.exports = router;
