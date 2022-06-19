const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
const port = 5000;
const rootDirectory = __dirname;
const routeIndex = rootDirectory + "/index.html"
const weatherAPI_endPoint = "https://api.openweathermap.org/data/2.5/weather?";
const weatherAPI_geo_endPoint = "https://api.openweathermap.org/geo/1.0/direct?q=";
const weatherAPI_key = "b44a85b66fe75e276a19327f15419cc5";
const weatherAPI_iconURL_endPoint = "http://openweathermap.org/img/wn/";

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

//Post methods from HTML
app.post("/getWeatherByName", function(req, res) {
  var cityName = req.body.cityName;
  getCoordinatesFromWeatherAPI(cityName, res);
});

app.post("/getWeatherByCoordinates", function(req, res) {
  var latitude = parseFloat(req.body.latitude);
  var longitude = parseFloat(req.body.longitude);
  getDataFromWeatherAPI(latitude, longitude, res);
});

//Get Data from Weather API
function getCoordinatesFromWeatherAPI(cityName, res) {
  const completeURL = weatherAPI_geo_endPoint + cityName + "&limit=1&appid=" + weatherAPI_key
  https.get(completeURL, function(response) {
    if (response.statusCode >= 400) {
      res.send("Client error: ERROR CODE " + response.statusCode);
    } else {
      response.on("data", function(data) {
        const cityData = JSON.parse(data);
        const latitude = parseFloat(cityData[0].lat);
        const longitude = parseFloat(cityData[0].lon);
        getDataFromWeatherAPI(latitude, longitude, res, cityName);
      });
    }
  });
}

function getDataFromWeatherAPI(lat, lon, res, cityName) {
  const completeURL = weatherAPI_endPoint + "lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + weatherAPI_key;
  console.log(completeURL);
  https.get(completeURL, function(response) {
    if (response.statusCode >= 400) {
      res.send("Client error: ERROR CODE " + response.statusCode);
    } else {
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = weatherAPI_iconURL_endPoint + icon + "@2x.png";
        if (cityName) res.write("<h1>The temperature in " + cityName + " is " + temperature + " Celcius.<\h1>");
        else res.write("<h1>The temperature in " + lat + " , " + lon + " is " + temperature + " Celcius.<\h1>");
        res.write("<h2>The weather is currently " + description + "<\h2>");
        res.write("<img src=" + imageURL + ">");
        res.send();
      });
    }
  });
}