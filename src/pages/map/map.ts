import { Component, afterNextRender, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as L from 'leaflet';
import { WeatherApi } from '../../services/weatherapi';
@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {
  private weatherApi = inject(WeatherApi);
  private title = inject(Title);

   private initWeatherMap() {
    const mapUrlTemplate = this.weatherApi.getTemperatureMapUrl();

    if (!mapUrlTemplate) {
        return;
    }

    const southWest = L.latLng(-85, -180);
    const northEast = L.latLng(85, 180);
    const bounds = L.latLngBounds(southWest, northEast);

    const map = L.map('weather-map', {
        zoomControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
        keyboard: false,
        minZoom: 1,
        maxZoom: 1,
        maxBounds: bounds,        
        maxBoundsViscosity: 1.0     
    }).setView([0, 0], 1);         

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        noWrap: true,
        bounds: bounds,
        detectRetina: false 
    }).addTo(map);

    L.tileLayer(mapUrlTemplate, {
        attribution: '&copy; OpenWeatherMap',
        opacity: 0.65,
        noWrap: true,
        bounds: bounds,
        detectRetina: false
    }).addTo(map);

    const popup = L.popup();

    map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      popup
        .setLatLng(e.latlng)
        .setContent('<div>⏳</div>')
        .openOn(map);

      this.weatherApi.getCurrentWeatherData({ lat, lon }).subscribe({
        next: (data: any) => {
          const temp = Math.round(data.main.temp);

          popup.setContent(`<span>${temp}°C</span>`);
        },
        error: (err) => {
          console.error('მონაცემების მოტანა ვერ მოხერხდა:', err);
          popup.setContent('<span>მონაცემების მოტანა ვერ მოხერხდა</span>');
        }
      });
    });
  }

  constructor() {
    afterNextRender(() => {
      this.initWeatherMap();
    });
  }

  ngOnInit(): void {
    this.title.setTitle($localize`რუკა`);
  }
}