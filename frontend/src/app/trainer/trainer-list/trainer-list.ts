import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trainer } from '../../services/trainer';

@Component({
  selector: 'app-trainer-list',
  imports: [
    RouterLink
  ],
  templateUrl: './trainer-list.html',
  styleUrl: './trainer-list.css'
})
export class TrainerList {
  trainers: any = [];
  constructor(private trainerService: Trainer) {}
  ngOnInit(): void {
    this.trainerService.getTrainer().subscribe((data) => {
      console.log('trainer-list')
      this.trainers = data;
    });
  }
  ngOnDestroy() {
    
  }
}
