import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainer-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './trainer-menu.html',
  styleUrl: './trainer-menu.css'
})
export class TrainerMenu {
  //currentUrl: any = '';
  //trainer: any = ''
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
/*     this.route.params.subscribe(params => {
      this.trainer = params['name']
    }); */
/*     this.route.url.subscribe((urlSegments) => {
      this.currentUrl = urlSegments.map(segment => segment.path).join('/');
    }); */
  }
  ngOnDestroy() {
    //this.currentUrl.unsubscribe()
    //this.trainer.unsubscribe();
  }
}
