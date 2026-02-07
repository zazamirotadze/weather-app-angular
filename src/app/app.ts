import { Component, inject, OnInit} from '@angular/core';
import { LanguageMenu } from '../components/languages-menu/language-menu';
import { LocationMenu } from '../components/location-menu/location-menu';
import { ActivatedRoute } from '@angular/router';
import { LocationRepresentation } from '../components/location-representation/location-representation';
import { WeatherState } from '../services/weatherState';
import { translations } from '../data/translations';

@Component({
  selector: 'app-root',
  imports: [LanguageMenu, LocationMenu, LocationRepresentation],
  templateUrl: './app.html'
})
export class App implements OnInit {
  private route = inject(ActivatedRoute);
  protected weatherState = inject(WeatherState);
  protected translations = translations;
  
 ngOnInit(): void {
   this.route.queryParamMap.subscribe(params => {
      this.weatherState.setLocation(params.get('location') || 'Tsrikvali');
      this.weatherState.setLanguage(params.get('language') || 'ka');
   })}
}
