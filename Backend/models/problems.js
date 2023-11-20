const mongoose = require("mongoose");

const newproblem = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
        unique: true,
      },
    title : {
        type : String,
        required : true,
    },
    difficulty : {
        type : String,
        required : true,
    },
    acceptance: {
        type: String,
        required: true,
    },
      description: {
        type: String,
        required: true,
    },
      exampleIn: {
        type: String,
        required: true,
    },
      exampleOut: {
        type: String,
        required: true,
    },

        });

const PROBLEMS = mongoose.model('problems', newproblem);


module.exports = PROBLEMS;
