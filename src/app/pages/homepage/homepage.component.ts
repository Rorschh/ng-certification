import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from 'src/app/services/app.service';
import {catchError} from 'rxjs/operators';
import {ILocationWeatherData} from 'src/app/interfaces/get-weather.interface';
import {LS_WEATHER_DATA_KEY, LS_ZIPCODE_KEY} from 'src/app/app.constants';
import {throwError} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  form: FormGroup;

  zipcodeList: string[] = [];
  locationsWeatherData: ILocationWeatherData[] = [];

  isDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AppService
  ) {
    this.form = this.fb.group({
      zipcode: ['', Validators.required]
    })

    this.updateFromLS();
  }

  ngOnInit(): void {
  }

  removeLocationEvent(): void {
    this.updateFromLS();
  }

  addLocation(): void {
    if (this.form.invalid) {
      return;
    }

    this.isDisabled = true;

    const zipcode: string = this.form.get('zipcode')?.value;
    const zipcodeList: string[] = JSON.parse(localStorage.getItem(LS_ZIPCODE_KEY) as string);

    if (zipcodeList && zipcodeList.find(item => item === zipcode)) {
      alert(`Zipcode already in list`);
      this.isDisabled = false;

      return;

    } else {
      this.service.getCurrentWeather(zipcode).pipe(
        catchError((err) => {
          alert(`Zipcode ${zipcode} not found`);
          this.form.reset();
          this.isDisabled = false;
          
          return throwError(err);
        })
      ).subscribe(locationWeatherData => {
        this.isDisabled = false;

        this.locationsWeatherData.splice(0, 0, locationWeatherData);
        localStorage.setItem(LS_WEATHER_DATA_KEY, JSON.stringify(this.locationsWeatherData));

        this.zipcodeList.push(zipcode);
        localStorage.setItem(LS_ZIPCODE_KEY, JSON.stringify(this.zipcodeList));
      });
    }
  }

  private updateFromLS(): void {
    const lsZipcodes: string[] = JSON.parse(localStorage.getItem(LS_ZIPCODE_KEY) as string);
    const lsWeatherData: ILocationWeatherData[] = JSON.parse(localStorage.getItem(LS_WEATHER_DATA_KEY) as string);

    if(lsZipcodes && lsWeatherData) {
      this.zipcodeList = lsZipcodes;
      this.locationsWeatherData = lsWeatherData;
    }
  }

}
