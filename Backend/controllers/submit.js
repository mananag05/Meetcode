const SUBMISSION = require("../models/submits");

async function submit (req,res){
    const isCorrect = Math.random() < 0.5;
    const problemId = req.body.probId;
    const submission = req.body.submission;
    const time = req.body.subtime;
    var submissionStatus = isCorrect ? "AC" : "WA";
  
    var newSubmisson = new SUBMISSION({
      submission : submission,
      probId : problemId,
      userId: req.userId,
      status: submissionStatus,
      subtime : time,
    });;
  
    try{
      newSubmisson.save();
    }
    catch (error) {
      console.error('Error while saving submission in db:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
    return res.json({
      status: submissionStatus,
    });
}

async function submission(req,res){
    const problemId = req.params.pid;
    var filteredsubmissions = [];
    try{
      filteredsubmissions = await SUBMISSION.find({ userId: req.userId, probId: problemId });
    } catch (error) {
      console.error('Error while fetching submissions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({
      filteredsubmissions,
    });
}

module.exports = {
    submit,
    submission,
}