// src/Weather.js
import React, { useState } from 'react';
import './Weather.css';

//import clear_icon from "Weather_icons/clear.png";
//import cloud_icon from "Weather_icons/cloud.png";
//import drizzle_icon from "Weather_icons/drizzle.png";
//import rain_icon from "Weather_icons/rain.png";
//import snow_icon from "Weather_icons/snow.png";

const Weather = () => {
    const [weatherData, setWeatherData] = useState({ 
        temp: null, 
        city: '',
        humidity: null,
        windSpeed: null 
    });
    const [query, setQuery] = useState('');

    const fetchWeather = (e) => {
        e.preventDefault();
        const apiKey = '97950b770a8ce244406fc6f09d742cfc'; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;


        fetch(url)
            .then(response => response.json())
            .then(data => {
                //const kelvinTemp = data.main.temp;
                //const celsiusTemp = kelvinTemp - 273.15;
                setWeatherData({
                    temp: data.main.temp,
                    city: data.name,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    icon: data.weather[0].icon
                });
            })
            .catch(error => console.error('Error:', error));
    };

    // Function to get the weather icon URL
    const getWeatherIconUrl = (iconCode) => {
        return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    return (
        <div className="weather-container">
            <form onSubmit={fetchWeather}>
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="search-bar"
                />
                <button type="submit" className="search-button">Q</button>
            </form>
            {weatherData.city && (
                <div className="weather-info">
                    <div className="weather-icon">
                    <img src={getWeatherIconUrl(weatherData.icon)} alt="Weather icon" />
                    </div> 
                    <div className="temperature">{weatherData.temp}°C</div>
                    <div className="city-name">{weatherData.city}</div>
                    <div className="humidity">Humidity: {weatherData.humidity}%</div>
                    <div className="wind-speed">Wind Speed: {weatherData.windSpeed} km/h</div>
                </div>
            )}
        </div>
    );
};

export default Weather;
