import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { APY_KEY } from '../app.constants';
import { IGetWeatherRes, ILocationWeatherData } from '../interfaces/get-weather.interface';
import { map } from 'rxjs/operators';
import { IGetWeatherForecast, IWeatherForecastData } from '../interfaces/get-weather-forecast.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private apiKey = APY_KEY;
  private apiBaseUrl = 'https://api.openweathermap.org/data/2.5'

  constructor(
    private http: HttpClient
  ) { }

  getCurrentWeather(zipCode: string): Observable<ILocationWeatherData> {
    const options = {
      params : {
        zip: zipCode,
        appid: this.apiKey
      }
    }

    return this.http.get<IGetWeatherRes>(`${this.apiBaseUrl}/weather`, options).pipe(
      map(res => {
        const weather = res.weather;
        const main = res.main;
        const name = res.name;
        const icon = this.setWeatherIcon(weather[0].main);

        main.temp = Math.round(main.temp - 273.15);
        main.temp_max = Math.round(main.temp_max - 273.15);
        main.temp_min = Math.round(main.temp_min - 273.15);

        const weatherData: ILocationWeatherData = {
          name,
          weather,
          main,
          zipCode,
          icon
        }

        return weatherData;
      })
    );
  }

  getWeatherForecast(zipCode: string): Observable<any> {
    const options = {
      params : {
        zip: zipCode,
        appid: this.apiKey,
        cnt: 5
      }
    }

    return this.http.get<IGetWeatherForecast>(`${this.apiBaseUrl}/forecast/daily`, options).pipe(
      map(res => {
        const cityName = res.city.name;
        let list = res.list;

        list.forEach(item => {
          item.dt = item.dt * 1000;
          item.temp.max = Math.round(item.temp.max - 273.15);
          item.temp.min = Math.round(item.temp.min - 273.15);
          item.weather[0].icon = this.setWeatherIcon(item.weather[0].main);
        })

        const weatherForecastData: IWeatherForecastData = {
          cityName,
          list
        }

        return weatherForecastData;
      })
    );
  }

  private setWeatherIcon(weather: string): string {
    let icon = '';

    switch(weather) {
      case 'Clouds':
        icon = 'clouds';
        break;
      case 'Clear':
        icon = 'sun';
        break;
      case 'Snow':
        icon = 'snow';
        break;
      case 'Rain':
        icon = 'rain';
        break;
      case 'Drizzle':
        icon = 'rain';
        break;
      case 'Thunderstorm':
        icon = 'rain';
        break;
    }

    return icon;
  }

}
