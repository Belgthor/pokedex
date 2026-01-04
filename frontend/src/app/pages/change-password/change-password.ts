import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  name: any = ''
  passwordOld = '';
  passwordNew1 = '';
  passwordNew2 = '';

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(): void{
    this.name = localStorage.getItem('name');
  }
  onSubmit(form: NgForm){
    if(form.valid && (this.passwordNew1 === this.passwordNew2)){
      this.authService.changePW(this.name, this.passwordOld, this.passwordNew1)
        .subscribe({
          next:(res)=>{
            this.authService.saveToken(res.token);
            this.authService.saveName(this.name)
            this.router.navigate(['/auth']);
          },
          error:(err)=>{
            console.error('Login failed: ', err);
            alert('Change Password failed '+ (err.error.error)|| 'Check credentials')
          }
        })
    //   this.authService.login(this.name, this.password)
    //   .subscribe({
    //     next:(res)=>{
    //       console.log('login: ' + res.token)
    //       this.authService.saveToken(res.token);
    //       this.authService.saveName(this.name)
    //       this.router.navigate(['/trainer']);
    //     },
    //    error: (err)=>{
    //     console.error('Login failed: ', err);
    //     alert('Login failed '+ (err.error.error)|| 'Check credentials')
    //    }
    //   });
    }
  }
}
