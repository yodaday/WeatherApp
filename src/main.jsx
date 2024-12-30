import React, { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherInput from "./components/WeatherInput";
import WeatherInfo from "./components/WeatherInfo";
import Error from "./components/Error";
import "./styles/weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "874fd710b6acf007664d80ee6ed6ff55";

  async function fetchWeather() {
    if (!city) {
      setError({ message: "Please select a city" });
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
        setError(null);
      } else {
        const error = await response.json();
        setError(error);
        setWeather(null);
      }
    } catch (error) {
      setError(error);
      setWeather(null);
    }
  }

  return (
    <div className="weather">
      <WeatherInput city={city} setCity={setCity} fetchWeather={fetchWeather} />
      {weather && <WeatherInfo weather={weather} />}
      {error && <Error error={error} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weather />
  </StrictMode>
);
