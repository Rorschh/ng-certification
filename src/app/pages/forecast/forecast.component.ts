import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { IWeatherForecastData } from 'src/app/interfaces/get-weather-forecast.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  weatherForecastData!: IWeatherForecastData;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: AppService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      take(1),
      tap(params => {
        this.service.getWeatherForecast(params.zipCode).subscribe(res => {
          this.weatherForecastData = res;
        })
      })
    ).subscribe();
  }

}
