import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',

})
export class Login {
  name = '';
  password = '';

  constructor(private authService: AuthService, private router:Router){}

  onSubmit(form: NgForm){
    if(form.valid){
      this.authService.login(this.name, this.password)
      .subscribe({
        next:(res)=>{
          console.log('login: ' + res.token)
          this.authService.saveToken(res.token);
          this.authService.saveName(this.name)
          this.router.navigate(['/auth']);
        },
       error: (err)=>{
        console.error('Login failed: ', err);
        alert('Login failed '+ (err.error.error)|| 'Check credentials')
       }
      });
    }
  }
}