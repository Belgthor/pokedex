import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    RouterLink
  ],
  template: `
<div class="list-group list-group-flush pt-1">
    @if(!authenticated){<a routerLink="/auth/login" class="list-group-item list-group-item-action">Login</a>}
    @if(authenticated){<a routerLink="/auth/register" class="list-group-item list-group-item-action">Register</a>}
    @if(authenticated){<a routerLink="/auth/changepw" class="list-group-item list-group-item-action">Change Password</a>}
    <!-- @if(authenticated){<a routerLink="/dashboard" class="list-group-item list-group-item-action">Dashboard</a>} -->
</div>
@if(authenticated){<button (click)="logout()" type="button" class="btn">Logout</button>}
  `,
  styles: ``
})
export class NavBarComponent {
  name: any = ''
  get authenticated(){
    return this.authService.isAuthenticated();
  }

  constructor(public authService: AuthService, private router:Router){

  }
  ngOnInit(): void{
    this.name = localStorage.getItem('name');
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}