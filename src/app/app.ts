import { Component, inject} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageMenu } from "../components/languages-menu/language-menu";
import { WeatherState } from '../services/weatherState';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LanguageMenu]
})
export class App {
  protected weatherState = inject(WeatherState);
}
