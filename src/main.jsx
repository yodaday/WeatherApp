import React, { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherInput from "./components/WeatherInput";
import WeatherInfo from "./components/WeatherInfo";
import Error from "./components/Error";
import "./styles/weather.css";

const API_KEY = "874fd710b6acf007664d80ee6ed6ff55"; // WeatherStack API key
const UNSPLASH_ACCESS_KEY = "ondM_F1II2rjzAh_A5Fk-5L1ilOHJhSiJhfBnyvRUZM"; // Replace with your Unsplash Access Key

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  async function fetchWeather() {
    if (!city) {
      setError({ message: "Please enter a city name" });
      return;
    }

    try {
      // Fetch weather data from WeatherStack API
      const weatherResponse = await fetch(
        `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      const weatherData = await weatherResponse.json();

      if (!weatherData || !weatherData.current) {
        setError({
          message: "City not found. Please check the name and try again.",
        });
        setWeather(null);
        return;
      }

      // Update weather state
      setWeather(weatherData);
      setError(null);

      // Fetch city image from Unsplash
      const imageResponse = await fetch(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const imageData = await imageResponse.json();

      if (imageData && imageData.urls && imageData.urls.regular) {
        // Update background
        document.body.style.backgroundImage = `url(${imageData.urls.regular})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
      } else {
        setError({ message: "No images found for this city on Unsplash." });
      }
    } catch (err) {
      setError({ message: "An unexpected error occurred. Please try again." });
      setWeather(null);
    }
  }

  return (
    <div>
      <WeatherInput setCity={setCity} fetchWeather={fetchWeather} />
      {error && <Error error={error} />}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weather />
  </StrictMode>
);
