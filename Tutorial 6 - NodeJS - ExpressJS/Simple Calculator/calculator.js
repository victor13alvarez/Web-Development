const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const port = 7000;
app.use(bodyParser.urlencoded({
  extended: true
})); //
//RootPage, Callback function
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html"); //Here you retrun index.html
})

app.post('/', (req, res) => {
  var num1 = Number(req.body.num1)
  var num2 = Number(req.body.num2)
  var result = num1 + num2;
  res.send("The result is: " + result); //Here you retrun index.html
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})