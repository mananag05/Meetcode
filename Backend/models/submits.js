const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    submission: String,
    probId: Number,
    userId: String,
    status: String,
    subtime: String
  });


  const SUBMISSION = mongoose.model('Submissions', submissionSchema);

  module.exports = SUBMISSION;