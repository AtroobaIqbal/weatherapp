import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const API = {
    key : "0d843f2c79729a4f510af8a026217988",
    url : "https://api.openweathermap.org/data/2.5/weather"
  }
  

  const handleSearch = () => {
    fetch(`${API.url}?q=${city}&appid=${API.key}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      setWeatherData(data);
      console.log(data)
    })
  };

  return (
    <div className="App">
    <header className='App-header'>
      {/*header*/}
      <h1>Weather App</h1>
      {/*search */}
      <div className='search'>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
              setCity("");
            }
          }
        }
        />
        <button onClick={handleSearch}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" style={{color: "#ffffff",}} /><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none"><path fill="#ffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg></button>
      </div>
      <div className='info'>
        {/* name */}
        <p>{weatherData.name && `${weatherData.name}`}</p>
        {/* temperature */}
        <p>{weatherData.main && `${weatherData.main.temp}°C`}</p>
      </div>

      <div className='description'>
        {/*condition*/}
        {weatherData.weather && weatherData.weather.length >   0 && (
          <>
            <p>{weatherData.weather[0].main}</p>
            <p>({weatherData.weather[0].description})</p>
          </>
        )}
      </div>
      <div className="moreInfo">
        <div className="feels">
          {weatherData.main ? <p className='bold'>{weatherData.main.feels_like.toFixed()}°C</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {weatherData.main ? <p className='bold'>{weatherData.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {weatherData.wind ? <p className='bold'>{weatherData.wind.speed.toFixed()} MPH</p> : null}
          <p>Wind Speed</p>
        </div>
      </div>
    </header>  
    </div>
  );
}

export default App;
