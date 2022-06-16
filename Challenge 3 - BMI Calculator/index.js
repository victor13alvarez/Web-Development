const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const dirName = __dirname;
const mainPage = "/index.html"
const bmiCalculatorPage = "/bmiCalculator.html"

const port = 7000;
app.use(bodyParser.urlencoded({
  extended: true
})); //

app.get('/', (req, res) => {
  res.sendFile(dirName + mainPage); //Here you retrun index.html
})

app.get(bmiCalculatorPage, (req, res) => {
  res.sendFile(dirName + bmiCalculatorPage);
})

app.post(bmiCalculatorPage, (req, res) => {

  result = calculateBMI(parseFloat(req.body.weight), parseFloat(req.body.height));
  res.send("Your BMI is " + result);
})
app.listen(port, () => {
  console.log(`BMI Calculator server listening on port ${port}`);
})

function calculateBMI(weight, height) {
  return (weight) / Math.pow(height, 2);
}