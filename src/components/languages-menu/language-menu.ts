import { Component, WritableSignal, inject, signal } from '@angular/core';
import { languages } from '../../data/languages';
import { Language } from '../../types/weather.types';
import { ClickOutside } from '../../directives/click-outside';
import { Router } from '@angular/router';
import { WeatherState } from '../../services/weatherState';

@Component({
  selector: 'app-language-menu',
  imports: [ClickOutside],
  templateUrl: './languages.html'
})
export class LanguageMenu {
  private router = inject(Router)
  protected weatherstate = inject(WeatherState)
  protected languages: Language[] = languages;
  protected isOpen: WritableSignal<boolean> = signal(false); 
  
  setLanguage(language: string) {
    this.isOpen.set(false);

    if (window.location.hostname === 'localhost') {
      console.log(`ლოკალჰოსტზე დინამიურად ენა ვერ გადაირთვება. გამოიყენე ტერმინალის სკრიპტები.`);
      return; 
    }

    const currentPathspace = window.location.pathname; 
    const urlSegments = currentPathspace.split('/');

    urlSegments[1] = language;
    const newUrl = urlSegments.join('/');

    const currentSearch = window.location.search;

    window.location.href = `${window.location.origin}${newUrl}${currentSearch}`;
  }
}
