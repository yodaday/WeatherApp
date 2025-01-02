import React, { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherInput from "./components/WeatherInput";
import WeatherInfo from "./components/WeatherInfo";
import Error from "./components/Error";
import "./styles/weather.css";

const API_KEY = "874fd710b6acf007664d80ee6ed6ff55";

const flickrAPIKey = "c57b877d90b02109a7131b8576f897bc";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  async function fetchWeather() {
    if (!city) {
      setError({ message: "Please select a city" });
      return;
    }

    try {
      // Fetch weather data from WeatherStack API
      const weatherResponse = await fetch(
        `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();

        // Check if the city is valid
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

        const imageResponse = await fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAPIKey}&tags=${city}&format=json&nojsoncallback=1`
        );

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          const photo = imageData.photos.photo[0]; // Get the first image

          // Construct the image URL
          const imageUrl = `https://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

          // Update background image based on city
          if (imageUrl) {
            document.body.style.backgroundImage = `url(${imageUrl})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center center";
          } else {
            setError({ message: "No images found for this city" });
          }
        } else {
          setError({ message: "Failed to fetch image from Flickr" });
        }
      } else {
        const error = await weatherResponse.json();
        setError({
          message: error.error.info || "Failed to fetch weather data.",
        });
        setWeather(null);
      }
    } catch (error) {
      setError({ message: "An unexpected error occurred. Please try again." });
      setWeather(null);
    }
  }

  return (
    <div>
      <WeatherInput setCity={setCity} fetchWeather={fetchWeather} />
      {error && <Error message={error.message} />}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Weather />
  </StrictMode>
);
