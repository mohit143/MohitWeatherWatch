
export type CurrentWeather = {
  time: string;
  interval: number;
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number
};

export type Location = {
  name: string;
  country: string;
};

export type ForecastDay = {
  time: string;
  sunrise: string;
  sunset: string;
  weather_code: number;
  avgtemp_c: number
};

export type WeatherData = {
  current?: CurrentWeather;
  daily?: DailyWeatherData;
  location?: Location;
};

export type DailyWeatherData = {
  time: string[];
  sunrise: string[];
  sunset: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}
