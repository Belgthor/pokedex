import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  password = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(form: NgForm){
    if(form.valid){
      this.authService.register(this.name, this.password)
      .subscribe({
        next:()=>{
          alert('Registration successful! Please log in.');
          this.router.navigate(['/auth/login'])
        },
        error: (err)=>{
          console.error('Registration failed.', err);
          alert('Registration failed: '+(err.error?.message || "Unknown error"))
        }
      });
    }
  }
}