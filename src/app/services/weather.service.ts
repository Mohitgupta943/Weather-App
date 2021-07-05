import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  countryCode = 'us';
  forecastCount=5;
  apiKey = '5a4b2d457ecbef9eb2a71e480b947604';
  constructor(private http: HttpClient) {}
  getWeatherDataByZipCode(zipCode: string): Observable<any> {
    
    let weatherUrl=`http://api.openweathermap.org/data/2.5/weather?q=${zipCode},us&units=metric&appid=${this.apiKey}`
    return this.http.get(weatherUrl,{responseType:'json'})

   
  }

  getForeCastData(zipCode:string):Observable<any>{
    let foreCastUrl=`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode},${this.countryCode}&cnt=${this.forecastCount}&units=metric&appid=${this.apiKey}`
    return this.http.get(foreCastUrl);
  }
}
