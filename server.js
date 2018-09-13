const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE === "production") {
  app.use(express.static("client/build"));
}

//add routes
app.use(routes);

//connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactnytsearch",
  { useNewUrlParser: true }
);
mongoose.Promise = Promise;
//start the api server
var server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

const io = require("socket.io")(server);
const articles = [];
io.on("connection", function(socket) {
  console.log("user connected");

  socket.on("saved", data => {
      console.log(data);
    io.emit("send to all", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
