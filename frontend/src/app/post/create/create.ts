import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PostService } from '../post-service';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-create',
  imports: [RouterModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  title = '';
  body = '';
  error = '';

  constructor(private postService: PostService, private router: Router, private toastService: ToastService){}

  submit(){
    if(!this.title || !this.body){
      this.error = "Title and Body fields are required.";
      return;
    }

    const input = {
      title: this.title,
      body: this.body,
      id: ''
    };

    this.postService.createPost(input).subscribe({
    next: (response) => {
      console.log('POST successful:', response);
      this.toastService.show( {message: response.message, header: 'Success', classname: 'bg-success text-light', delay: 3000 });
      this.router.navigate(['posts']);
      // Handle successful response
    },
    error: (error) => {
      console.error('POST failed:', error);
      this.toastService.show( {message: error.error.message, header: 'Failed', classname: 'bg-danger text-light', delay: 3000 });
      // Handle error, e.g., display an error message to the user
    },
    complete: () => {
      console.log('POST request completed.');
    }
  });
    //alert()
    // alert("Post created");
    
    
  }

}