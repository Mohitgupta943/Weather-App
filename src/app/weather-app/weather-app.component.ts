import { Component, OnInit } from '@angular/core';
import { WeatherCard } from '../models/WeatherCard.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css']
})
export class WeatherAppComponent implements OnInit {

  name = 'Angular';
  zipCodeStr: string;
  isValidZip: boolean = true;
  isDuplicateZip:boolean=false;
  zipCodeArray: Array<string>;
  weatherDataArray:Array<WeatherCard>;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherDataArray = JSON.parse(localStorage.getItem('weatherDataArray'));
    if (this.weatherDataArray == null) {
      this.weatherDataArray= [];
      localStorage.setItem('weatherDataArray', JSON.stringify(this.weatherDataArray));
    }
    console.log(this.weatherDataArray);
  }

  addLocation(): void {
    console.log(this.zipCodeStr);
    this.isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.zipCodeStr);

    if (this.isValidZip) {
      this.isDuplicateZip=false;
      this.checkDuplicateZip(this.zipCodeStr);
      console.log("isDuplicate",this.isDuplicateZip)
      if(this.isDuplicateZip==false){
        this.getWeatherData(this.zipCodeStr);
      }
     

    }
  }

  getWeatherData(zipCode: string): any {
   
    console.log(zipCode, '********************')
    this.weatherService.getWeatherDataByZipCode(zipCode).subscribe(res => {
      var weatherCard:WeatherCard=this.parseResponse(res,this.zipCodeStr)
      console.log(weatherCard)
      // this.zipCodeArray.push(this.zipCodeStr);
      // this.zipCodeArray = Array.from(new Set(this.zipCodeArray));
      this.weatherDataArray.push(weatherCard);
      localStorage.setItem('weatherDataArray', JSON.stringify(this.weatherDataArray));
      console.log(this.weatherDataArray);

    }, err => {
      console.log("Invalid Zip")
      this.isValidZip = false
    });
    
  }

  parseResponse(res:any,zip:string):WeatherCard{
    let newWeatherCard:WeatherCard=new WeatherCard();
    console.log(res['name'])
    let iconCode=res['weather'][0]['icon']
  
    newWeatherCard.zipCode=zip;
    newWeatherCard.locationName=res['name'];
    newWeatherCard.currentCondition=res['weather'][0]['main'];
    let condition= newWeatherCard.currentCondition.toLowerCase();
    let icon='sun'
    newWeatherCard.currentTemperature=res['main']['temp'];
    newWeatherCard.maxToday=res['main']['temp_max'];
    newWeatherCard.minToday=res['main']['temp_min']
    newWeatherCard.forcastLink=`/forecast/${zip}`
    //newWeatherCard.iconLink=` http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    if(condition=='clouds'){icon='clouds';}
    else if(condition=='rain'){icon='rain';}
    else if(condition=='snow'){icon='snow';}
    else {icon='sun';}
    
    newWeatherCard.iconLink=`https://www.angulartraining.com/images/weather/${icon}.png`
    return newWeatherCard;

  }

  deleteLocation(index:number):void{
    console.log('before',this.weatherDataArray.length);
    this.weatherDataArray.splice(index,1);
    console.log('after',this.weatherDataArray.length);
    localStorage.setItem('weatherDataArray', JSON.stringify(this.weatherDataArray));

  }

  checkDuplicateZip(zip:string):void{

    this.weatherDataArray.forEach((weatherData)=>{
      
      if (weatherData.zipCode===zip){
        console.log("-------------->",weatherData.zipCode,zip)
        this.isDuplicateZip=true;
      }

    });

 
  }

}
