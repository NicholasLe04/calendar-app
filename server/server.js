const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require('dotenv').config({ path: './config.env' });
const PORT = process.env.PORT;
const dbUrl = process.env.DB_URI;

const router = require("./routes/router");
const userRouter = require("./routes/userRouter");


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
app.use("/users", userRouter);
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});

