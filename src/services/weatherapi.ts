import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Location } from '../types/weather.types';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherApi {
  private readonly http = inject(HttpClient);

  private getData(baseUrl: string, supportedLocation: Omit<Location, 'name' | 'displayName'>) {
      if (!environment.weatherApiKey) {
      return throwError(() => new Error('API key is missing'));
      }

    return this.http.get(`${baseUrl}?lat=${supportedLocation.lat}&lon=${supportedLocation.lon}&appid=${environment.weatherApiKey}&units=metric`);
  }
  
  getForecastWeatherData(supportedLocation: Omit<Location, 'name' | 'displayName'> ){
    return this.getData('https://api.openweathermap.org/data/2.5/forecast', supportedLocation);
  }

  getCurrentWeatherData(supportedLocation: Omit<Location, 'name' | 'displayName'> ){
    return this.getData('https://api.openweathermap.org/data/2.5/weather', supportedLocation);
  }

  getTemperatureMapUrl(): string | null {
    if (!environment.weatherApiKey) {
      console.error('API key is missing')
      return null;
    }

    return `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${environment.weatherApiKey}`;
  }
}
