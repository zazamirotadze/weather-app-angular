import { Component, WritableSignal, signal } from '@angular/core';
import { languages } from '../../data/languages';
import { Language } from '../../types/weather.types';
import { translations } from '../../data/translations';
import { ClickOutside } from '../../directives/click-outside';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherState } from '../../services/weatherState';

@Component({
  selector: 'app-language-menu',
  imports: [ClickOutside],
  templateUrl: './languages.html'
})
export class LanguageMenu {
  constructor(private router: Router, private route: ActivatedRoute, public weatherstate: WeatherState) {}
  languages: Language[] = languages;
  translations = translations;
  isOpen: WritableSignal<boolean> = signal(false); 
  
  setLanguage(language: string) {
    this.weatherstate.setLanguage(language);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { language: language },
      queryParamsHandling: 'merge' 
    });
  }
}
