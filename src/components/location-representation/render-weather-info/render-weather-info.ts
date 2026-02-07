import { Component, computed, Input, Signal, input } from '@angular/core';
import { Info, Language, WeatherData } from '../../../types/weather.types';
import { translations } from '../../../data/translations';

@Component({
  selector: 'app-render-weather-info',
  imports: [],
  templateUrl: './render-weather-info.html'
})
export class RenderWeatherInfo {
  translations = translations
  weatherForSpecificDay = input.required<WeatherData>();
  infos = input.required<Info[]>();
  supportedLanguage = input.required<Language>();

  infosMap: Signal<Record<string, string> | null> = computed(() => {
      if (!this.weatherForSpecificDay) return null;

      return {
        temp: this.translations.temp[this.supportedLanguage()?.name].replace('{value}', this.weatherForSpecificDay().main.temp.toFixed(1)),
        feels_like: this.translations.feelsLike[this.supportedLanguage()?.name].replace('{value}', this.weatherForSpecificDay().main.feels_like.toFixed(1)),
        humidity: this.translations.humidity[this.supportedLanguage()?.name].replace('{value}', this.weatherForSpecificDay().main.humidity.toString()),
        pressure: this.translations.pressure[this.supportedLanguage()?.name].replace('{value}', (this.weatherForSpecificDay().main.pressure / 10).toFixed(1)),
        windSpeed: this.translations.windSpeed[this.supportedLanguage()?.name].replace('{value}', (this.weatherForSpecificDay().wind.speed * 3.6).toFixed(1))
      };
   });
}