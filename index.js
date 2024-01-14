import {} from "dotenv/config";
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

const apiKey = process.env.APIKEY;
const URL = "https://api.openweathermap.org/data/2.5/weather";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      URL + `?q=Cluj-Napoca&appid=${apiKey}&units=metric`
    );
    res.render("index.ejs", {
      city: result.data.name,
      country: result.data.sys.country,
      temp: Math.round(result.data.main.temp),
      temp_min: Math.round(result.data.main.temp_min),
      temp_max: Math.round(result.data.main.temp_max),
      pressure: result.data.main.pressure,
      humidity: result.data.main.humidity,
      wind: result.data.wind.speed,
      sunrise: new Date(result.data.sys.sunrise * 1000).getHours(),
      minutesSunrise: new Date(result.data.sys.sunrise * 1000).getMinutes(),
      sunset: new Date(result.data.sys.sunset * 1000).getHours(),
      minutesSunset: new Date(result.data.sys.sunset * 1000).getMinutes(),
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500);
  }
});

app.post("/", async (req, res) => {
  try {
    const city = req.body.newItem;
    const result = await axios.get(
      URL + `?q=${city}&appid=${apiKey}&units=metric`
    );
    res.render("index.ejs", {
      city: result.data.name,
      country: result.data.sys.country,
      temp: Math.round(result.data.main.temp),
      temp_min: Math.round(result.data.main.temp_min),
      temp_max: Math.round(result.data.main.temp_max),
      pressure: result.data.main.pressure,
      humidity: result.data.main.humidity,
      wind: result.data.wind.speed,
      sunrise: new Date(result.data.sys.sunrise * 1000).getHours(),
      minutesSunrise: new Date(result.data.sys.sunrise * 1000).getMinutes(),
      sunset: new Date(result.data.sys.sunset * 1000).getHours(),
      minutesSunset: new Date(result.data.sys.sunset * 1000).getMinutes(),
    });
  } catch (error) {
    console.error(error.response.data);
    res.status(500);
  }
});

app.listen(process.env.PORT || 3000);
