import { computed, inject, Injectable, resource, signal, WritableSignal } from '@angular/core';
import { Location, WeatherData } from '../types/weather.types';
import { locations } from '../data/locations';
import { WeatherApi } from './weatherapi';
import { firstValueFrom } from 'rxjs';
import { TimeOfDay } from '../enums/weather.enums';

@Injectable({
  providedIn: 'root'
})
export class WeatherState {
    private weatherApi = inject(WeatherApi);
    private _selectedLocationName: WritableSignal<null | string> = signal(null);

    setLocation(name: string) {
        this._selectedLocationName.set(name);
    }

    supportedLocation = computed<Location | null>(() =>  locations.find(loc => loc.name === this._selectedLocationName()) || null);

    
    userResource = resource({
        params: () => {
        const location = this.supportedLocation();
        if (!location) return;

        return {
            lat: location.lat,
            lon: location.lon
        };
        },
        
        loader: async ({ params }) => {
            return await Promise.all([
                firstValueFrom(this.weatherApi.getCurrentWeatherData(params)),
                firstValueFrom(this.weatherApi.getForecastWeatherData(params))
            ]);
        }
    });

    public weatherData = computed(() => {
        const rawData = this.userResource.value() as undefined | [WeatherData, {list: WeatherData[]}]
        if (!rawData) return;

        const 
            [currentWeatherData, futureWeatherData] = rawData,
            uniqueDates = new Set<string>(),
            uniqueObjects: WeatherData[] = [],
            today = new Date().toISOString().split('T')[0];

        uniqueDates.add(today)
        uniqueObjects.push(currentWeatherData);

        futureWeatherData.list.forEach((element) => {
            const currentDate = element.dt_txt.split(' ')[0];
            if (!uniqueDates.has(currentDate)) {
                uniqueDates.add(currentDate);
                uniqueObjects.push(element);
            }
        });  

        return uniqueObjects;
    });
  
    public currentWeather = computed(() => this.weatherData()?.[0] || null);
    public futureWeather = computed(() => this.weatherData()?.slice(1) || null);
    public timeOfDay = computed(() => {
        const data = this.weatherData()?.[0]; 
  
        if (!data) return null; 

        const icon = data.weather[0].icon;

        return icon.endsWith('n') ? TimeOfDay.Night : TimeOfDay.Day;
    });
}
