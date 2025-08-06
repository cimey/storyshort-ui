import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryService } from '../../../core/services/story.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-script-input.component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './script-input.component.html',
  styleUrl: './script-input.component.scss'
})
export class ScriptInputComponent implements OnInit {
  storyForm: FormGroup;
  loading = false;
  errorMessage = '';

  samplePrompts = [
    "Tell the story of a software engineer who leaves a stable job to start a company focused on solving mental health challenges using AI.",
    "Show how artificial intelligence is transforming daily life — from smart homes and autonomous vehicles to personalized education and medicine.",
    "Create a story about an engineer who helps communities by solving problems through open-source software.",
    "Show the value of open-source software by telling the story of a global team building a free tool that helps millions.",
    "A grandmother teaching her granddaughter traditional dance under moonlight in a small village.",
    "A shared outdoor dinner in a Mediterranean village — long table with people from different cultures passing food, hanging lights above, laughter and stories in the air.",
    "A curious red fox standing in a glowing bioluminescent forest at night — surreal colors, oversized mushrooms, twinkling stars above",
    "A floating village in the clouds with houses on islands, birds delivering letters between them — dreamy sky colors, soft lighting, storybook style",
    "A child experiencing snow for the first time, wearing a colorful winter coat, eyes wide in wonder, arms raised as snowflakes fall around — cozy village in the background.",
    "“A young woman at sunrise, standing at the edge of a cliff with the wind in her hair, gazing at the horizon, reflecting on a major life decision — cinematic lighting, warm tones, emotional atmosphere."
  ];
  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private router: Router
  ) {
    this.storyForm = this.fb.group({
      prompt: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  ngOnInit(): void {
    const currStory = JSON.parse(this.storyService.getCurrentStory() ?? "null");

    if (currStory != null || currStory != undefined) {
      const res = confirm("There is already a script ready. If you want to continue with existing one, please click OK.");
      if (res) {
        this.router.navigate(["/preview"]);
      }
      else {
        this.storyService.setCurrentStory(null);
      }
    }
  }

  onSubmit(): void {
    if (this.storyForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    const { prompt } = this.storyForm.value;
    this.storyService.generateStory(prompt).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (!response.success) {
          this.errorMessage = response.error;
          return;
        }
        this.storyService.setCurrentStory(response.data); // save to shared state
        this.router.navigate(['/preview']);
      },
      error: (error: any) => {
        this.errorMessage = 'Something went wrong. Please try again.';
        console.error(error);
        this.loading = false;
        
          if (error.status === 429) {
            this.errorMessage = 'Daily video Generation Limit Reached!';
          }
      }
    });
  }

  onSamplePromptChange(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.storyForm.get('prompt')?.setValue(selectedValue);
  }
}
