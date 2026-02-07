import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloud, faCloudRain, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from '../../../types/weather.types';
import { TimeOfDay } from '../../../enums/weather.enums';

@Component({
  selector: 'app-render-weather-icon',
  imports: [FontAwesomeModule],
  templateUrl: './render-weather-icon.html'
})

export class RenderWeatherIcon {
  protected readonly TimeOfDay = TimeOfDay
  protected readonly faIcons = {faCloud, faCloudRain, faSnowflake, faSun};

  iconSize = input.required<number>();
  weatherCondition = input.required<WeatherData>();
  timeOfDay = input.required<TimeOfDay>();
}
