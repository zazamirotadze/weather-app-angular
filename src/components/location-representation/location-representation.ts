import { Component, computed, inject } from '@angular/core';
import { SupportedLocations, SupportedLanguages } from '../../types/weather.types';
import { translations } from '../../data/translations';
import { RenderWeatherIcon } from './render-weather-icon/render-weather-icon';
import { convertIntoGeorgianDate } from '../../util/convertIntoGeorgianDate';
import { RenderWeatherInfo } from './render-weather-info/render-weather-info';
import { WeatherState } from '../../services/weatherState';
import { WeatherPresentationState } from '../../enums/weather.enums';

@Component({
  selector: 'app-location-representation',
  imports: [RenderWeatherIcon, RenderWeatherInfo],
  templateUrl: './location-representation.html'
})
export class LocationRepresentation {
  readonly WeatherPresentationState = WeatherPresentationState;
  protected weatherState = inject(WeatherState);

  convertIntoGeorgianDate = convertIntoGeorgianDate;
  translations = translations;

  viewState = computed(() => {
    if (this.weatherState.userResource.isLoading()) {
      return WeatherPresentationState.Loading;
    } 
    if (!this.weatherState.supportedLanguage()) {
      return WeatherPresentationState.LanguageError;
    } 

    if (!this.weatherState.supportedLocation()) {
      return WeatherPresentationState.LocationError;
    } 

    if (this.weatherState.userResource.error() || !this.weatherState.weatherData()?.length) {
      return WeatherPresentationState.FetchError;
    } 
    
    return WeatherPresentationState.Success;
  });

  translatedLocationName = computed(() => this.translations.locations[this.weatherState.supportedLocation()?.name as SupportedLocations][this.weatherState.supportedLanguage()?.name as SupportedLanguages]);
}
