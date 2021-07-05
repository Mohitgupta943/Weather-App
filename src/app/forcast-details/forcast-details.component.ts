import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastCard } from '../models/ForecastCard.model';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-forcast-details',
  templateUrl: './forcast-details.component.html',
  styleUrls: ['./forcast-details.component.css']
})
export class ForcastDetailsComponent implements OnInit {
  zipCode: string;
  cityName: string;
  foreCastArray: Array<ForecastCard>;
  constructor(private route: ActivatedRoute,
    private weatherService: WeatherService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.route.params.subscribe((paramMap) => {
      this.zipCode = paramMap['zip']
      this.foreCastArray = [];
      this.weatherService.getForeCastData(this.zipCode).subscribe(
        res => {
          console.log(res);
          this.cityName = res['city']['name'];
          this.parseResponse(res)
          console.log(this.foreCastArray);
        },
        err=>{
          alert("Something went wrong.. Try again")
        }
      )
    })

  }

  parseResponse(res): void {

    let arr = res['list']

    arr.forEach((card) => {
      let tempForecastCard = new ForecastCard();
      tempForecastCard.maxToday = card['temp']['max'];
      tempForecastCard.minToday = card['temp']['min'];
      tempForecastCard.currentCondition = card['weather'][0]['main'];
      let condition = tempForecastCard.currentCondition.toLowerCase();
      let tempDate = new Date(card['dt'] * 1000)
      tempForecastCard.date = this.datePipe.transform(tempDate, 'EEEE,MMM d');
      tempForecastCard.iconLink = `https://www.angulartraining.com/images/weather/${condition}.png`
      this, this.foreCastArray.push(tempForecastCard);
      console.log(this.datePipe.transform(tempDate, 'EEEE,MMM d'))
    });

  }

}
