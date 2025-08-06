import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../core/services/story.service';

@Component({
  selector: 'app-video-list.component',
  imports: [CommonModule],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent implements OnInit {

  constructor(private storyService: StoryService) { }
  ngOnInit(): void {
    this.storyService.getUserVideos().subscribe((resp) => {
      this.videos = resp;
    })
  }
  videos: any[] = []
  openVideo(url: string) {
    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  }
}
