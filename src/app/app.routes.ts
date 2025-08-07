import { Routes } from '@angular/router';
import { ScriptInputComponent } from './features/script/script-input/script-input.component';
import { PreviewComponent } from './features/script/preview/preview.component';
import { GenerateComponent } from './features/script/generate.component/generate.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { inject } from '@angular/core';
import { MainComponent } from './features/script/main.component/main.component';
import { LandingComponent } from './features/script/landing.component/landing.component';
import { VideoListComponent } from './features/script/video-list.component/video-list.component';
export const routes: Routes = [
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: 'landing', component: LandingComponent },
    {
        path: '', component: MainComponent, children: [
            { path: 'input', component: ScriptInputComponent },
            { path: 'preview', component: PreviewComponent },
            { path: 'video-list', component: VideoListComponent },
            { path: 'generate', component: GenerateComponent }], canActivate: [(next, state) => inject(AuthGuard).canActivate(next, state)]
    },
    { path: '**', redirectTo: '/landing' }
];
