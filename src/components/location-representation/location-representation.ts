import { Component, computed, inject } from '@angular/core';
import { RenderWeatherIcon } from './render-weather-icon/render-weather-icon';
import { convertIntoGeorgianDate } from '../../util/convertIntoGeorgianDate';
import { RenderWeatherInfo } from './render-weather-info/render-weather-info';
import { WeatherState } from '../../services/weatherState';
import { WeatherPresentationState } from '../../enums/weather.enums';

@Component({
  selector: 'app-location-representation',
  imports: [RenderWeatherIcon, RenderWeatherInfo],
  styleUrl: './location-representation.css',
  templateUrl: './location-representation.html'
})
export class LocationRepresentation {
  protected weatherState = inject(WeatherState);
  protected readonly WeatherPresentationState = WeatherPresentationState;
  protected convertIntoGeorgianDate = convertIntoGeorgianDate;

  protected viewState = computed(() => {
    if (this.weatherState.userResource.isLoading()) {
      return WeatherPresentationState.Loading;
    } 

    if (this.weatherState.userResource.error() || !this.weatherState.weatherData()?.length) {
      return WeatherPresentationState.FetchError;
    } 
    
    return WeatherPresentationState.Success;
  });

  protected translatedLocationName = computed(() => this.weatherState.supportedLocation()?.displayName || '');
}
