import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../core/services/story.service';
import { CommonModule } from '@angular/common';
import { generateTextResponse } from '../../../shared/models/generate-text.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-generate.component',
  imports: [CommonModule],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.scss'
})
export class GenerateComponent implements OnInit {
  constructor(private videoService: StoryService, private router: Router) { }

  currentStory: generateTextResponse | null = null;
  requestId: string = "";
  success= false;
  error: string | null = null;
  isLoading = false;
  ngOnInit(): void {
    this.currentStory = JSON.parse(this.videoService.getCurrentStory() ?? "null");
    if (this.currentStory == null) {
      alert("Please generate a script before moving to the video generation step");
      this.router.navigate(["/input"]);
    }

    this.requestId = this.currentStory?.id ?? "";
    this.isLoading = true;
    this.videoService.generateVideo({ requestId: this.requestId, input: this.currentStory! }).subscribe(
      {
        next: (response: any) => {
          this.success = true;
          this.isLoading = false;
          this.videoService.setCurrentStory(null);
        },
        error: (error: any) => {
          this.error = 'Something went wrong while generating the video.';
          this.isLoading = false;
          if (error.status === 429) {
            this.error = 'Daily video Generation Limit Reached';
          }
        }
      })
  }

  navigate(route: any){
      this.router.navigate(route);

  }
}
