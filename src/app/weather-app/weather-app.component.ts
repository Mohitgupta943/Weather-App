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
  weatherDataArray:Array<WeatherCard>;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherDataArray = JSON.parse(localStorage.getItem('weatherDataArray'));
   
    if (this.weatherDataArray === null) {
      this.weatherDataArray= [];
      localStorage.setItem('weatherDataArray', JSON.stringify(this.weatherDataArray));
    }
    console.log(this.weatherDataArray);
  }

  addLocation(): void {
    console.log(this.zipCodeStr);
    this.isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.zipCodeStr);
    this.isDuplicateZip=false;
    if (this.isValidZip) {
      
      this.checkAndDeleteDuplicate(this.zipCodeStr)
      this.getWeatherData(this.zipCodeStr);
      

      
     

    }
  }

  getWeatherData(zipCode: string): any {
   

    this.weatherService.getWeatherDataByZipCode(zipCode).subscribe(
      res => {
      var weatherCard:WeatherCard=this.parseResponse(res,this.zipCodeStr)
      console.log(weatherCard)
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

  checkAndDeleteDuplicate(zip:string):void{

    for(let index=0;index<this.weatherDataArray.length;index++){
      if (this.weatherDataArray[index].zipCode===zip){
      console.log("-------------->")
        this.weatherDataArray.splice(index,1);
        console.log("DELETED",)
      
    }
  }

  }

}
