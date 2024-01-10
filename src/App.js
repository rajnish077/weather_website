import "./App.css";
import { Search, MapPin, Wind } from "react-feather";
import getWeather from "./Api/api";
import { useState } from "react";
// import { render } from "@testing-library/react";
import dateFormat from "dateformat";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  return (
    <>
      <div className="app">
        <h1>Check Weather here....</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => getWeatherbyCity()}>
            <Search></Search>
          </button>
        </div>

        {weather && weather.weather && (
          <div className="content">
            <div className="location d-flex">
              <MapPin></MapPin>
              <h2>
                {weather.name}
                <span>({weather.sys.country})</span>
              </h2>
            </div>
            <p className="datetext">{renderDate()}</p>

            <div className="weatherdesc d-flex flex-c">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt=""
              />
              <h3>{weather.weather[0].description}</h3>
            </div>

            <div className="tempstats d-flex flex-c">
              <h1>
                {weather.main.temp}
                <span>&deg;C</span>
              </h1>
              <h3>
                Feels like {weather.main.feels_like}
                <span>&deg;C</span>
              </h3>
            </div>

            <div className="windstats d-flex">
              <Wind></Wind>
              <h3>
                Wind is {weather.wind.speed} knots in {weather.wind.deg}&deg;
              </h3>
            </div>
          </div>
        )}

        {!weather.weather && (
          <div className="content">
            <h4>No Data Found !!</h4>
          </div>
        )}
        {/* <p>{JSON.stringify(weather)}</p> */}
      </div>
    </>
  );
}

export default App;
