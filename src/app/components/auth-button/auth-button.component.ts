import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="isAuthenticated | async; else loggedOut">
      <button (click)="logout()">
        Log out
      </button>
    </ng-container>

    <ng-template #loggedOut>
      <button (click)="login()">Log in</button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, private auth: AuthService) { }


  login() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/home',
      },
    })
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
  }

  get isAuthenticated(): Observable<boolean> {
    return this.auth.isAuthenticated$
  }
}
