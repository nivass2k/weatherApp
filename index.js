const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const query = req.body.city_name;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query + process.env.APPID
   
  https.get(url, function (response) {
    console.log(response);
    response.on("data", function (data) {
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const weatherDescription = WeatherData.weather[0].description;
      res.write("<h1>The temperature in " + query + " is " + temp+"</h1>");
      res.write("<h3>Weather : "+weatherDescription+"</h3>");
      res.send();
    });
  });
});
app.listen(3000);
