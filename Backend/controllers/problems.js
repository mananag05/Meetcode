const PROBLEMS = require("../models/problems")

async function getallprobs(req,res){

    const problems = await PROBLEMS.find({}, 'problemId difficulty acceptance title');

    const filteredProblems = problems.map((x) => ({
        problemId: x.problemId,
        difficulty: x.difficulty,
        acceptance: x.acceptance,
        title: x.title,
      }));
    
      res.json({
        problems: filteredProblems,
      });
}

async function getspecprob(req, res) {
    const id = req.params.id;

    try {
        const problem = await PROBLEMS.findOne({ problemId: id });

        if (!problem) {
            return res.status(411).json({});
        }

        res.json({
            problem,
        });
    } catch (error) {
        console.error('Error fetching specific problem:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}
async function createproblem(req,res){
    var probId = req.body.problemId;
    var curtitle = req.body.title;
    var diff = req.body.difficulty;
    var accept = req.body.acceptance;
    var desc = req.body.description;
    var examin = req.body.exampleIn;
    var examout = req.body.exampleOut;

    var newprob = new PROBLEMS({
        problemId: probId,
        title: curtitle,
        difficulty: diff,
        acceptance: accept,
        description: desc,
        exampleIn: examin,
        exampleOut: examout,
    })

    try{
        newprob.save();
      }
      catch (error) {
        console.error('Error while saving problem in db:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

    return res.json({
        status: "submitted",
      });
}

async function createauth(){



}

module.exports = {
    getallprobs,
    getspecprob,
    createproblem,
    createauth,
}
