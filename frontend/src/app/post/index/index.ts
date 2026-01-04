import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterModule],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {
  // posts: Post[] = [];
  posts: Post[] = []
  constructor(private postService: PostService){}

  ngOnInit(): void{
    this.loadPosts();
  }

  deletePost(id: string){
    if(confirm("Are you sure to remove this post?")){
      this.postService.deletePost(id).subscribe(()=>{
          this.loadPosts();
      });
    }
  }

  loadPosts(){
      this.postService.getPosts().subscribe((data: Post[]) => {
            this.posts = data;
                console.log(data)
          })
  }

}