import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LocationMenu } from '../../components/location-menu/location-menu';
import { LocationRepresentation } from '../../components/location-representation/location-representation';
import { WeatherState } from '../../services/weatherState';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [LocationMenu, LocationRepresentation],
  templateUrl: './forecast.html'
})
export class Forecast implements OnInit {
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  protected weatherState = inject(WeatherState);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.weatherState.setLocation(params.get('location') || 'Tsrikvali');
    });
      
    this.title.setTitle($localize`პროგნოზი`);
  }
}