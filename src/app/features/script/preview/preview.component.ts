import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { generateTextResponse } from '../../../shared/models/generate-text.model';
import { StoryService } from '../../../core/services/story.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit, AfterViewInit {
  data!: generateTextResponse;
  id: string = "";

  @ViewChild('carousel') carousel!: ElementRef;
  editMode: boolean[] = [];

  constructor(private service: StoryService,
    private router: Router) { }
  ngAfterViewInit(): void {
    this.carousel.nativeElement.style.scrollBehavior = 'smooth';
  }

  ngOnInit(): void {
    const currentStory: generateTextResponse = JSON.parse(this.service.getCurrentStory() ?? "null");
    if(currentStory == null){
      this.router.navigate(['/input'])
    }
    this.id = currentStory.id;
    this.data = currentStory;
  }

  @Output() submitEdited = new EventEmitter<generateTextResponse>();

  editingIndex: number | null = null;

  startEdit(index: number) {
    this.editingIndex = index;
  }

  stopEdit() {
    this.editingIndex = null;
  }

  onSubmit() {
    this.stopEdit();
    this.submitEdited.emit(this.data);
  }

  generateVideo() {
    this.service.setCurrentStory(this.data);
    this.router.navigate(['/generate']);
  }

  scrollCarousel(direction: number) {
    const cardWidth = 320; // card width + margin
    this.carousel.nativeElement.scrollLeft += direction * cardWidth;
  }

  toggleEdit(index: number) {
    this.editMode[index] = !this.editMode[index];
  }

}