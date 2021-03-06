const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
//db config
const db = require("./config/key").mongoURI;
//connect mongoose
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected"))
  .catch(err => {
    console.log("errrrrrrrrrrr");
  });

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//use route
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
///////////////////////mongodb://brad:brad@ds231725.mlab.com:31725/devconnector
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
