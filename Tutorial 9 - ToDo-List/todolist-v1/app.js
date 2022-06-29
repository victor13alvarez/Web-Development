const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const port = 5000;
const indexHtml = __dirname + "/index.html"

const app = express();

const tasksList = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(port, function() {
  console.log(`Server started successfully in port ${port}`);
})

app.get("/", function(req, res) {
  res.redirect('/homePage');
})
app.get("/homePage", function(req, res) {
  res.render("list.ejs", {
    date: date.getCompleteDate(),
    tasksList: tasksList
  });
})

app.post("/createNewItem", function(req, res) {
  const task = req?.body?.newTask;
  if (task !== '') tasksList.push(task);
  res.redirect('/homePage')
})

app.post("/deleteItems", function(req, res) {
  const taskToRemove = req?.body?.button;
  tasksList.splice(taskToRemove, 1);
  // tasksList = [];
  res.redirect('/homePage')
})