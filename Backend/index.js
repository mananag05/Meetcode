const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const cors = require("cors");
app.use(cors());
app.use(jsonParser);
require("dotenv").config();

const logsignroute = require("./Routes/users")
const sumissionrouter = require("./Routes/submits")
const problemrouter = require("./Routes/problems")

// connection
const {connectmongodb} = require('./connection')
connectmongodb(`mongodb+srv://${process.env.USER_API_USER}:${process.env.USER_API_KEY}@cluster.tfhewau.mongodb.net/?retryWrites=true&w=majority`);

// routes
app.use("/submission", sumissionrouter);
app.use("/",logsignroute);
app.use("/problems", problemrouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
