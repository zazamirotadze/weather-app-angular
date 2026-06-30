import { Component, computed, Signal, input } from '@angular/core';
import { Info, WeatherData } from '../../../types/weather.types';

@Component({
  selector: 'app-render-weather-info',
  imports: [],
  templateUrl: './render-weather-info.html'
})
export class RenderWeatherInfo {
  public weatherForSpecificDay = input.required<WeatherData>();
  public infos = input.required<Info[]>();

  infosMap: Signal<Record<string, string> | null> = computed(() => {
      const weather = this.weatherForSpecificDay();
      if (!weather) return null;

      const temp = weather.main.temp.toFixed(1);
      const feelsLike = weather.main.feels_like.toFixed(1);
      const humidity = weather.main.humidity.toString();
      const pressure = (weather.main.pressure / 10).toFixed(1);
      const windSpeed = (weather.wind.speed * 3.6).toFixed(1);

      return {
        temp: $localize`ტემპერატურა: ${temp} გრადუსი`,
        feels_like: $localize`ქარში მგრძნობელობა: ${feelsLike} გრადუსი`,
        humidity: $localize`ტენიანობა: ${humidity} პროცენტი`,
        pressure: $localize`წნევა: ${pressure} კილო პასკალი`,
        windSpeed: $localize`ქარის სისწრაფე: ${windSpeed} კმ/სთ`
      };
   });
}