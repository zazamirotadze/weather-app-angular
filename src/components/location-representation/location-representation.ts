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
    const 
        hasConfig = this.weatherState.supportedLanguage() && this.weatherState.supportedLocation(),
        isSuccess = !this.weatherState.userResource.error(),
        hasData = this.weatherState.weatherData() && this.weatherState.weatherData()?.length;

    if (this.weatherState.userResource.isLoading()) {
      return WeatherPresentationState.Loading;
    } else if (hasConfig && isSuccess && hasData) {
      return WeatherPresentationState.Success;
    } else {
      return WeatherPresentationState.Error;
    }
  });

  translatedLocationName = computed(() => this.translations.locations[this.weatherState.supportedLocation()?.name as SupportedLocations][this.weatherState.supportedLanguage()?.name as SupportedLanguages]);
}
