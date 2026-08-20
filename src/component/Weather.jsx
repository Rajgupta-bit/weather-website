import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'


const Weather = () => {
  const inputRef = useRef();
  const[weatherdata,setWeatherdata] = useState(false);

  const allIcon = {
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "10d":rain_icon,
    "10n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon,
  }
  const apiKey = import.meta.env.VITE_API_KEY;
  async function search(city){
    if(city===""){
      alert("enter city name");
         return;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    const data  = await response.json();
    console.log(data);
    const iconCode = allIcon[data.weather[0].icon] || clear_icon;
    setWeatherdata({
      humidity:data.main.humidity,
      windSpeed:data.wind.speed,
      temperature:Math.floor(data.main.temp),
       location:data.name,
       icon:iconCode
    })
  }
  useEffect(()=>{
    search("gorakhpur");
  },[])
  return (
    <div className='weather'>
       <div className='search-bar'>
          <input ref={inputRef} type="text" placeholder='search'/>
          <img src={search_icon} alt="search" onClick={()=>search(inputRef.current.value)} />
       </div>
        <img src={weatherdata.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherdata
          .temperature}°C</p>
        <p className='location'>{weatherdata.location}</p>
       <div className="weather-data">
           <div className='clo'>
             <img src={humidity_icon} alt="" />
             <div>
                <p>{weatherdata.humidity} %</p>
                <span>Humidity</span>
             </div>
           </div>
           <div className='clo'>
             <img src={wind_icon} alt="" />
             <div>
                <p>{weatherdata.windSpeed} km/h</p>
                <span>wind speed</span>
             </div>
           </div>
       </div>
    </div>
  )
}

export default Weather;
