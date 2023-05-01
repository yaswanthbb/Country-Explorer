import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ selectedCountry }) => {
  const [weatherData, setWeatherData] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;
  
  useEffect(() => {
    if (selectedCountry) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${api_key}`;
      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedCountry,api_key]);
  if (!weatherData) {
    return null;
  }
  const temperature = (weatherData.main.temp - 273.15).toFixed(2); 
  const icon = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;  
  return (
    <div>
      <h2>Weather in {selectedCountry.capital[0]}</h2>
      <p>temperature {temperature} Celsius</p>
      <img src={iconUrl} alt="icon"/>
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
