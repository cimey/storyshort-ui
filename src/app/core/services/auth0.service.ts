import { Injectable } from '@angular/core';
import { AuthService, LogoutOptions } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {
  constructor(public auth: AuthService) { }

  login() {
    this.auth.loginWithRedirect({ authorizationParams: { scope: "openid profile email"}});
  }

  logout() {
    this.auth.logout();
  }
}
