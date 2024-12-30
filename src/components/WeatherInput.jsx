import React from "react";

function WeatherInput({ city, setCity, fetchWeather }) {
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleButtonClick = () => {
    fetchWeather();
  };

  return (
    <div className="weatherInput">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={handleButtonClick}>Get Weather</button>
    </div>
  );
}

export default WeatherInput;
