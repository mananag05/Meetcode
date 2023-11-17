const express = require("express");
const app = express();
const port = 3000;
var jwt = require("jsonwebtoken");
const { auth } = require("./middleware");
let USER_ID_COUNTER = 1;
const USERS = [];
const mongoose = require('mongoose');
const JWT_SECRET = "secret";
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);

mongoose.connect('mongodb://127.0.0.1:27017/meetcodedb')
.then(() => console.log('Connected to MongoDB') )
.catch(error => {
  console.error('Error:', error);
});


const PROBLEMS = [
  {
    problemId: "1",
    title: "401. Bitwise AND of Numbers Range",
    difficulty: "Hard",
    acceptance: "40%",
    description:
      "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    exampleIn: "left = 5, right = 7",
    exampleOut: "4",
  },
  {
    problemId: "2",
    title: "205. Add two numbers",
    difficulty: "Medium",
    acceptance: "41%",
    description:
      "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
    exampleIn: "a = 100 , b = 200",
    exampleOut: "300",
  },
  {
    problemId: "3",
    title: "202. Happy Number",
    difficulty: "Easy",
    acceptance: "43%",
    description: "Write an algorithm to determine if a number n is happy.",
    exampleIn: "n = 19",
    exampleOut: "true",
  },
  {
    problemId: "4",
    title: "203. Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "44%",
    description: "Given number k , removed kth element",
    exampleIn: "list: 1->2->3 , k=2",
    exampleOut: "1->3",
  },
  {
    problemId: "5",
    title: "201. Bitwise AND of Numbers Range",
    difficulty: "Medium",
    acceptance: "45%",
    description:
      "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    exampleIn: "left = 5, right = 7",
    exampleOut: "4",
  },
  {
    problemId: "6",
    title: "205.  Container With Most Water",
    difficulty: "Medium",
    acceptance: "46%",
    description:
      "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
    exampleIn: "a = 100 , b = 200",
    exampleOut: "300",
  },
  {
    problemId: "7",
    title: "202. Happy Number",
    difficulty: "Easy",
    acceptance: "47.9%",
    description: "Write an algorithm to determine if a number n is happy.",
    exampleIn: "n = 19",
    exampleOut: "true",
  },
  {
    problemId: "8",
    title: "203. Letter Combinations of a Phone Number",
    difficulty: "Hard",
    acceptance: "48%",
    description: "Given number k , removed kth element",
    exampleIn: "list: 1->2->3 , k=2",
    exampleOut: "1->3",
  },
  {
    problemId: "9",
    title: "401. Bitwise AND of Numbers Range",
    difficulty: "Easy",
    acceptance: "49%",
    description:
      "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    exampleIn: "left = 5, right = 7",
    exampleOut: "4",
  },
  {
    problemId: "10",
    title: "205. Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: "50%",
    description:
      "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
    exampleIn: "a = 100 , b = 200",
    exampleOut: "300",
  },
  {
    problemId: "11",
    title: "202. Happy Number",
    difficulty: "Easy",
    acceptance: "51.9%",
    description: "Write an algorithm to determine if a number n is happy.",
    exampleIn: "n = 19",
    exampleOut: "true",
  },
  {
    problemId: "12",
    title: "203. Substring with Concatenation of All Words",
    difficulty: "Hard",
    acceptance: "52%",
    description: "Given number k , removed kth element",
    exampleIn: "list: 1->2->3 , k=2",
    exampleOut: "1->3",
  },
  {
    problemId: "13",
    title: "201. Bitwise AND of Numbers Range",
    difficulty: "Easy",
    acceptance: "53%",
    description:
      "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
    exampleIn: "left = 5, right = 7",
    exampleOut: "4",
  },
  {
    problemId: "14",
    title: "205. Add two numbers",
    difficulty: "Medium",
    acceptance: "54%",
    description:
      "Given two numbers, add them and return them in integer range. use MOD=1e9+7",
    exampleIn: "a = 100 , b = 200",
    exampleOut: "300",
  },
  {
    problemId: "15",
    title: "202. Reverse Integer",
    difficulty: "Hard",
    acceptance: "55.9%",
    description: "Write an algorithm to determine if a number n is happy.",
    exampleIn: "n = 19",
    exampleOut: "true",
  },
  {
    problemId: "16",
    title: "203. Remove Linked List Elements",
    difficulty: "Hard",
    acceptance: "56%",
    description: "Given number k , removed kth element",
    exampleIn: "list: 1->2->3 , k=2",
    exampleOut: "1->3",
  },
];



// Define the schema
const submissionSchema = new mongoose.Schema({
  submission: String,
  probId: Number,
  userId: String,
  status: String,
  subtime: String
});

// Create the model
const SUBMISSION = mongoose.model('Submissions', submissionSchema);




app.get("/", (req, res) => {
  console.log[USERS],
  res.json({
    msg: "hello world",
  });
});

app.get("/problems", (req, res) => {
  const filteredProblems = PROBLEMS.map((x) => ({
    problemId: x.problemId,
    difficulty: x.difficulty,
    acceptance: x.acceptance,
    title: x.title,
  }));

  res.json({
    problems: filteredProblems,
  });
});

app.get("/problem/:id", (req, res) => {
  const id = req.params.id;

  const problem = PROBLEMS.find((x) => x.problemId === id);

  if (!problem) {
    return res.status(411).json({});
  }
  res.json({
    
    problem,
  });
});

app.get("/me", auth, (req, res) => {
  const user = USERS.find((x) => x.id === req.userId);
  res.json({ email: user.email, id: user.id });
});

app.get("/submissions/:pid", auth, async (req, res) => {
  const problemId = req.params.pid;
  var filteredsubmissions = [];
  try{
    filteredsubmissions= await SUBMISSION.find({ userId: req.userId, probId: problemId });
  } catch (error) {
    console.error('Error while fetching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  res.json({
    filteredsubmissions,
  });
});

app.post("/submission", auth, (req, res) => {
  const isCorrect = Math.random() < 0.5;
  const problemId = req.body.probId;
  const submission = req.body.submission;
  const time = req.body.subtime
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

  
});

app.post("/signup", (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  if (USERS.find((x) => x.email === email)) {
    return res.status(403).json({ msg: "Email already exists" });
  }

  USERS.push({
    email,
    password,
    id: USER_ID_COUNTER++,
  });
  return res.json({
    msg: "Success",
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = USERS.find((x) => x.email === email);

  if (!user) {
    return res.status(403).json({ msg: "User not found" });
  }

  if (user.password !== password) {
    return res.status(403).json({ msg: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );
  return res.json({ token });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});