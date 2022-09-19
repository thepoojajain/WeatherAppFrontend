import React, { useEffect, useState } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

import './WeatherData.css';
import { transformAPIResponse } from '../../misc.service';
import * as urls from '../../data/url.data.json';
import CityWeatherData from '../CityWeatherData/CityWeatherData';
import CityWeatherForecast from '../CityWeatherForecast/CityWeatherForecast';
import SelectCity from '../SelectCity/SelectCity';

export default function WeatherData() {
  const [city, setCity] = useState(
    localStorage.getItem('favouriteCity') || 'Sydney'
  );
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const urlToHit = urls[city];

    const fetchData = async () => {
      const apiResponse = await fetch(
        `${urlToHit}${process.env.REACT_APP_API_KEY}`
      ).then((res) => res.json());
      const weatherDataToSet = transformAPIResponse(apiResponse);
      setWeatherData(weatherDataToSet);

      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
      );
    };

    fetchData();
  }, [city]);

  return (
    <div className="container-fluid">
      {weatherData && (
        <div className="row">
          <div className="col-lg-8">
            <SelectCity city={city} setCity={setCity} />
            <CityWeatherData city={city} {...weatherData.weatherToday} />
          </div>
          <div className="col-lg-4">
            <CityWeatherForecast
              dailyWeatherData={weatherData.weatherNextSevenDays}
            />
          </div>
        </div>
      )}
    </div>
  );
}
