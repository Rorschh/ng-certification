export interface IGetWeatherForecast {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: IList[]
}
interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
}
interface Coord {
  lon: number;
  lat: number;
}
export interface IList {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: IWeatherForecast[]
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
}
interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}
interface IWeatherForecast {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherForecastData {
  cityName: string;
  list: IList[];
}