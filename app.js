//imports..
const express = require("express");
const app = express();
var path = require("path");
const bodyparsor = require("body-parser");
const routers = require("./routes/routers");

//add middlewares
app.use(bodyparsor.urlencoded({ extended: false }));

//configure the project 

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.set(express.static("public"))


//add url handlers
app.use("/", routers);

app.listen(3002, function () {
    console.log("server is running at port 3002");
})

module.exports = app;