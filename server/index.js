const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT;
const dbUrl = process.env.DB_URI;

const userRouter = require("./routes/userRouter");
const eventRouter = require("./routes/eventRouter");


var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/event", eventRouter);

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});

module.exports = app;

