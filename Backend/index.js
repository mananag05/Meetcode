const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const cors = require("cors");
app.use(cors());
app.use(jsonParser);


const logsignroute = require("./Routes/users")
const sumissionrouter = require("./Routes/submits")
const problemrouter = require("./Routes/problems")

// connection
const {connectmongodb} = require('./connection')
connectmongodb('mongodb://127.0.0.1:27017/meetcodedb');

// routes
app.use("/submission", sumissionrouter);
app.use("/",logsignroute);
app.use("/problems", problemrouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
