import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { generateVideoRequest } from '../../shared/models/generate-text.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private httpClient: HttpClient) { }
  // baseUrl = "https://localhost:7048/api";
  // baseUrl = "http://localhost:3333/api";
  // baseUrl = "https://storyshortaiclone.onrender.com/api";
  baseUrl = "https://storyshortaiclone-2-381336012870.europe-west1.run.app/api";

  generateStory(script: string): Observable<any> {

    return this.httpClient.post(`${this.baseUrl}/generate/generate-script`, { prompt: script });
  }

  generateVideo(input: generateVideoRequest): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/generate/generate-video`, input);
  }

  setCurrentStory(currentStory: any): void {
    localStorage.setItem("currentStory", JSON.stringify(currentStory));
  }

  getCurrentStory() {
    return localStorage.getItem("currentStory");
  }

  getUserVideos(): Observable<any>  {
    return this.httpClient.get(`${this.baseUrl}/generate/video-list`);
  }
}
