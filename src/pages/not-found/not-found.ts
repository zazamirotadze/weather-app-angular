import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound  {
  private title = inject(Title);

  ngOnInit(): void {
    this.title.setTitle($localize`გვერდი ვერ მოიძებნა`);
  }
}