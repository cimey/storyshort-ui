import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoryService } from '../../../core/services/story.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-script-input.component',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './script-input.component.html',
  styleUrl: './script-input.component.scss'
})
export class ScriptInputComponent implements OnInit, AfterViewInit {
  storyForm: FormGroup;
  loading = false;
  errorMessage = '';
  genre = 'Drama';
  genres = ["Drama", "Sci-Fi / Futuristic", "Inspirational", "Fantasy / Mythical", "Cultural", "Artistic / Abstract", "Advanture"]
  samplePrompts = [
    `Tell the story of a software engineer who leaves a stable job to start a 
      company focused on solving mental health challenges using AI.`,
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

  prompts: { [key: string]: string[] } = {

    'Drama': [
      `A young woman at sunrise, standing at the edge of a cliff with the wind in her hair, gazing at the horizon, reflecting on a major life decision — cinematic lighting, warm tones, emotional atmosphere.`,
      "A software engineer leaves a high-paying job to reconnect with their roots in a rural village, only to find themselves confronting family expectations and past regrets.",
      "A widow struggles to keep her late husband's bookstore alive in a rapidly digitizing world — old letters, memories, and community help her rediscover her purpose."
    ],
    'Sci-Fi / Futuristic': ["A floating village in the clouds with houses on islands, birds delivering letters between them — dreamy sky colors, soft lighting, storybook style.",
      "A curious red fox standing in a glowing bioluminescent forest at night — surreal colors, oversized mushrooms, twinkling stars above.",
      "Show how artificial intelligence is transforming daily life — from smart homes and autonomous vehicles to personalized education and medicine.",
      "In a world where memories can be downloaded, a scientist battles to recover the stolen essence of their child before it's corrupted forever."
    ],
    "Inspirational": [
      "Tell the story of a software engineer who leaves a stable job to start a company focused on solving mental health challenges using AI.",
      "Create a story about an engineer who helps communities by solving problems through open-source software.",
      "A young inventor creates a device that lets a deaf child hear their mother's lullaby for the first time.",
      "Show the value of open-source software by telling the story of a global team building a free tool that helps millions."
    ],
    "Fantasy / Mythical": [
      "A curious red fox standing in a glowing bioluminescent forest at night — surreal colors, oversized mushrooms, twinkling stars above.",
      "A floating village in the clouds with houses on islands, birds delivering letters between them — dreamy sky colors, soft lighting, storybook style.",
      "An orphan discovers a hidden library under their town with books that bring imaginary creatures to life.",
      "A forgotten forest spirit awakens as a girl’s tears hit the soil, protecting the village from an ancient curse."
    ],
    'Cultural': [
      "A grandmother teaching her granddaughter traditional dance under moonlight in a small village.",
      "A shared outdoor dinner in a Mediterranean village — long table with people from different cultures passing food, hanging lights above, laughter and stories in the air.",
      "A child experiencing snow for the first time, wearing a colorful winter coat, eyes wide in wonder, arms raised as snowflakes fall around — cozy village in the background.",
      "A street barber in India cuts hair while sharing life stories with locals — real, grounded, human moments."
    ],
    "Artistic / Abstract": [
      "A ballerina dancing on a rooftop during sunset — camera circles her as petals fall from the sky.",
      "Rain falling in reverse as people walk through it in slow motion, lights reflecting on cobblestone streets.",
      "An old typewriter types by itself in a dark room as glowing letters float upward and become stars.",
      "A surreal montage of eyes, oceans, clocks, and forests blending into one another, synced with poetic narration."
    ],
    "Adventure": [
      "A child stumbles upon an old treasure map hidden inside a library book, leading to a series of mysterious clues across the city.",
      "Two siblings build a homemade hot air balloon to search for their missing dog across forests, fields, and rooftops.",
      "A solo hiker gets lost in a mountain storm and is guided back by mysterious stone markings from an ancient culture.",
      "An engineer travels across continents solving water crises using DIY tech, meeting inspiring local heroes along the way."
    ]
  }
  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private router: Router
  ) {
    this.storyForm = this.fb.group({
      prompt: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['Drama'],
    });
    this.samplePrompts = this.prompts[this.genre];
    // this.storyForm.get('prompt')?.setValue(this.prompts[this.genre][0]);
  }
  ngAfterViewInit(): void {
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



  selectPrompt(prompt: string) {
    this.storyForm.get('prompt')?.setValue(prompt);
  }

  onGenreSelected(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.genre = selectedValue;
    this.samplePrompts = this.prompts[this.genre];
  }
   @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;

  scrollLeft() {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  }

  scrollRight() {
     if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  }
}
