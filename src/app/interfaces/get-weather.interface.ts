export interface IGetWeatherRes {
    coord: Coord;
    weather: IWeather[];
    base: string;
    main: IMain;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  interface Coord {
    lon: number;
    lat: number;
  }

  interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  interface IMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }

  interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }

  interface Clouds {
    all: number;
  }

  interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }
  
  export interface ILocationWeatherData {
    name: string;
    weather: IWeather[];
    main: IMain;
    zipCode: string;
    icon: string;
  }