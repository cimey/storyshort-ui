import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {

    // this.auth.handleRedirectCallback().subscribe({
    //   next: () => {
    //     this.router.navigate(['/input']); // Redirect to input after successful login
    //   },
    //   error: (err) => console.error(err),
    // });
  }
  protected title = 'Yet another AI powered app';
}
