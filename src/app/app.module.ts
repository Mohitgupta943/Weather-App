import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WeatherService } from './services/weather.service';
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { ForcastDetailsComponent } from './forcast-details/forcast-details.component';
import { WeatherAppComponent } from './weather-app/weather-app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpClientModule,AppRoutingModule],
  declarations: [ AppComponent, HelloComponent, ForcastDetailsComponent, WeatherAppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [WeatherService,{provide: APP_BASE_HREF, useValue: '/'},DatePipe]
})
export class AppModule { }
