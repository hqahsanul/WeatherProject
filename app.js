var express = require("express");
var express = require("express");
var https = require("https");
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "5bb01d6bdff8ed154a07cc93f8e58341";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1> The temperature in " + query + "  is  " + temp + " Degree C</h1>"
      );
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("The port 3000 activated");
});
