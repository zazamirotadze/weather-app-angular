import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ClickOutside } from '../../directives/click-outside';
import { Location } from '../../types/weather.types';
import { locations } from '../../data/locations';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherState } from '../../services/weatherState';

@Component({
  selector: 'app-location-menu',
  imports: [ClickOutside],
  templateUrl: './location-menu.html'
})
export class LocationMenu {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected weatherState = inject(WeatherState);
  protected locations: Location[] = locations;
  protected isOpen: WritableSignal<boolean> = signal(false); 

  setLocation(locationName: string) {
    this.weatherState.setLocation(locationName);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { location: locationName },
      queryParamsHandling: 'merge' 
    });
  }
}
