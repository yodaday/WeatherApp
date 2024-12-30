import React from "react";

function WeatherInfo({ weather }) {
  const { current } = weather;

  const weatherDescription = current?.weather_descriptions
    ? current.weather_descriptions[0]
    : "Weather description unavailable";

  return (
    <div className="weather-info">
      <h2>{weather.location.name}</h2>
      <p>{weatherDescription}</p>
      <p>Temperature: {current?.temperature}°C</p>
      <p>Humidity: {current?.humidity}%</p>
      <p>Wind Speed: {current?.wind_speed} km/h</p>
      <p>Pressure: {current?.pressure} hPa</p>
    </div>
  );
}

export default WeatherInfo;
