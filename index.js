require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
// const cors = require("cors");
const bodyParser = require("body-parser");
const morganMiddleware = require("./middlewares/morganMiddleware");
const jwtMiddleware = require("./middlewares/jwt");
const mongoose = require("mongoose")

// setting up middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morganMiddleware);
app.use(jwtMiddleware.tokenAuth);


// Getting data from env

let PORT = process.env.PORT || 3333;
let connUri = process.env.MONGO_URL

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB --  database connection established successfully!')

});

connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Configure Route
require("./routes/index")(app);

app.listen(PORT, () => {
  console.log("Application listening on port 👉👉👉", PORT);
  console.log("Server running on \033[0;94mhttp://localhost:" + PORT + "/ \033[0m");
});
