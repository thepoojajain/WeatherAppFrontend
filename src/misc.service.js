function transformDayWeatherRespones(dayWeatherData) {
  const {
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    wind_speed,
    rain,
    uvi,
    clouds,
    dew_point,
    weather: [{ description: weather_description, icon: weather_icon }],
  } = dayWeatherData;
  const { min: temp_min, max: temp_max } = temp;

  const dataToReturn = {
    dt,
    feels_like,
    sunrise,
    sunset,
    pressure,
    humidity,
    wind_speed,
    uvi,
    weather_description,
    weather_icon,
    clouds,
    dew_point,
  };

  if (temp_max) {
    dataToReturn.temp_max = temp_max;
    dataToReturn.temp_min = temp_min;
  } else {
    dataToReturn.temp = temp;
  }

  if (rain && rain['1h']) {
    dataToReturn.rain = rain['1h'];
  } else {
    dataToReturn.rain = rain;
  }
  return dataToReturn;
}

export function transformAPIResponse({ current, daily }) {
  return {
    weatherToday: transformDayWeatherRespones(current),
    weatherNextSevenDays: daily
      .filter((el, index) => index)
      .map((weatherItem) => transformDayWeatherRespones(weatherItem)),
  };
}
