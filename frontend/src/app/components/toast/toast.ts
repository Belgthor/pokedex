import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css']
})
export class ToastComponent {
  readonly toastService = inject(ToastService);
}