import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ToastService } from './services/toast';
import { ToastComponent } from './components/toast/toast';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet,ToastComponent,NgbDropdownModule,NavBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  collapsed = true;
  currentUrl: string = ''
  testUrl: any
  protected readonly title = signal('frontend10');
  constructor(
    private toastService: ToastService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        this.testUrl = this.router.url.split(';')[0]
      }
    });
  }
  showToast() {
    this.toastService.show( {message:'Hello, this is a toast message!', header: 'Notification', classname: 'bg-success text-light', delay: 3000 });
  }
  failToast(){
    this.toastService.show( {message:'Hello, this is a toast message!', header: 'Notification', classname: 'bg-danger text-light', delay: 3000 });
  }
}
