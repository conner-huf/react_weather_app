import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

export const WeatherApp = () => {

    // PASTE API KEY FROM .env FILE BELOW
    
    const api_key = "*-**-* API KEY HERE *-**-*";
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

    const search = async () => {
        const cityInput = document.getElementsByClassName("cityInput")
        if(cityInput[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput[0].value}&units=Imperial&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-data");
        const wind = document.getElementsByClassName("wind-data");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        if(data.cod==="404") {
            location[0].innerHTML = "Location not found";
        }
        else {
            humidity[0].innerHTML = Math.round(data.main.humidity) + '%';
            wind[0].innerHTML = Math.round(data.wind.speed) + ' mph';
            temperature[0].innerHTML = Math.round(data.main.temp) + '°';
            location[0].innerHTML = data.name;

            if(data.weather[0].icon==="01d" ||data.weather[0].icon==="01n") {
                setWeatherIcon(clear_icon);
            }
            else if(data.weather[0].icon==="02d" ||data.weather[0].icon==="02n") {
                setWeatherIcon(cloud_icon);
            }
            else if(data.weather[0].icon==="03d" ||data.weather[0].icon==="03n") {
                setWeatherIcon(drizzle_icon);
            }
            else if(data.weather[0].icon==="04d" ||data.weather[0].icon==="04n") {
                setWeatherIcon(drizzle_icon);
            }
            else if(data.weather[0].icon==="09d" ||data.weather[0].icon==="09n") {
                setWeatherIcon(rain_icon);
            }
            else if(data.weather[0].icon==="10d" ||data.weather[0].icon==="10n") {
                setWeatherIcon(rain_icon);
            }
            else if(data.weather[0].icon==="13d" ||data.weather[0].icon==="13n") {
                setWeatherIcon(snow_icon);
            }
            else {
                setWeatherIcon(clear_icon);
            }
        }
    }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='Search'/>
            <div className='search-icon' onClick={()=>{search()}}>
                <img src={search_icon} alt=''/>
            </div>
        </div>
        <div className="weather-image">
            <img src={weatherIcon} alt="" />
        </div>
        <div className="weather-temp">0°</div>
        <div className="weather-location">Search a City</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="humidity-data">0%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="wind-data">0 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}
