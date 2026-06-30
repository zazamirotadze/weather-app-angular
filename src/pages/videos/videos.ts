import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.html',
  styleUrl: './videos.css'
})
export class Videos {
  private sanitizer = inject(DomSanitizer);
  private title = inject(Title);

  protected videoIds = signal<string[]>([
    '1166926207'
  ]);
  
  protected activeVideoId = signal<string | null>(null);

  openVideo(id: string) {
    this.activeVideoId.set(id);
  }

  closeVideo() {
    this.activeVideoId.set(null);
  }

  getSafeVideoUrl(id: string) {
    const url = 'https://player.vimeo.com/video/' + id + '?badge=0&autopause=0';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.title.setTitle($localize`ვიდეოები`);
  }
}