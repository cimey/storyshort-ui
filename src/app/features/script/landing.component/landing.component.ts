import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-landing.component',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  constructor(public auth: AuthService, private router: Router) { }

  login() {
    this.router.navigate(['/input']);
  }
}
