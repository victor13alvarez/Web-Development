const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
const port = 5000;
const rootDirectory = __dirname;
const routeIndex = rootDirectory + "/index.html"
const weatherAPI_endPoint = "https://api.openweathermap.org/data/3.0/onecall?";
const weatherAPI_key = "335f1d833019404d39471657287c9bcf";
const weatherAPI_valenciaLongitude = "-0.38";
const weatherAPI_valenciaLatitude = "39.46";
const weatherAPI_iconURL_endPoint = "http://openweathermap.org/img/wn/";
const weatherAPI_iconURL_parameter = "@2x.png" //Before this parameter goes the iconID img

app.use(bodyParser.urlencoded({
  extended: true
}));

//Create the server port!
app.listen(port, function() {
  console.log("Server is running on port " + port);
})

//Create root Route
app.get("/", function(req, res) {
  res.sendFile(routeIndex);
  // getDataFromWeatherAPI(weatherAPI_endPoint + "lat=" + weatherAPI_valenciaLatitude + "&lon=" + weatherAPI_valenciaLongitude + "&appid=" + weatherAPI_key);
})

app.get("/index.html", function(req, res) {
  res.sendFile(routeIndex);
  // getDataFromWeatherAPI(weatherAPI_endPoint + "lat=" + weatherAPI_valenciaLatitude + "&lon=" + weatherAPI_valenciaLongitude + "&appid=" + weatherAPI_key);
})


//Get WeatherAPI data
function getDataFromWeatherAPI(lat, lon) {

}

//Post methods from HTML
app.post("/", async function(req, res) {
  var lat = parseFloat(req.body.Latitude);
  var lon = parseFloat(req.body.Longitude);
  var completeURL = weatherAPI_endPoint + "lat=" + lat + "&lon=" + lon + "units=metric&appid=" + weatherAPI_key;
  https.get(completeURL, function(response) {
    if (response.statusCode >= 400) {
      res.write("Client error");
      res.send();
    } else {

      response.on("data", function(data) {
        const weatherData = JSON.parse(data);

        // Inverted way of JSON
        //   const object = {
        //     name: "Victor",
        //     favouriteFood: "Chocolate"
        //   };
        //   JSON.stringify(object);
        const temperature = weatherData.current.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = weatherAPI_iconURL_endPoint + icon + weatherAPI_iconURL_parameter;
        res.write("The temperature in Valencia is " + temperature + "degrees Celcius");
        res.write("The weather is currently " + description);
        res.write("<img src=" + imageURL + ">");

        res.send();
      });
    }
  });
});