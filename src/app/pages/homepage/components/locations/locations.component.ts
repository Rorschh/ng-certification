import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LS_WEATHER_DATA_KEY, LS_ZIPCODE_KEY } from 'src/app/app.constants';
import { ILocationWeatherData } from 'src/app/interfaces/get-weather.interface';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  @Input() locationsWeatherData: ILocationWeatherData[] = [];

  @Output() removeLocationEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  removeLocation(zipCode: string): void {
    const LSZipcodeList = localStorage.getItem(LS_ZIPCODE_KEY);
    const LSLocationWeatherDataList = localStorage.getItem(LS_WEATHER_DATA_KEY);

    if(LSZipcodeList && LSLocationWeatherDataList) {
      const zipCodeList: string[] = JSON.parse(LSZipcodeList);
      const locationWeatherDataList: ILocationWeatherData[] = JSON.parse(LSLocationWeatherDataList);

      localStorage.setItem(LS_ZIPCODE_KEY, JSON.stringify(zipCodeList.filter(item => item !== zipCode)));
      localStorage.setItem(LS_WEATHER_DATA_KEY, JSON.stringify(locationWeatherDataList.filter(item => item.zipCode !== zipCode)));
      
    }

    this.removeLocationEvent.emit();
  }

}
