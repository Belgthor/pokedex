import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pokemon } from '../../services/pokemon';
import { Clipboard } from '@angular/cdk/clipboard';
import { ToastService } from '../../services/toast';
import { Trainer } from '../../services/trainer';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trade-mike',
  imports: [
    RouterLink,
    NgbDropdownModule,
  ],
  templateUrl: './trade-mike.html',
  styleUrl: './trade-mike.css'
})
export class TradeMike {
  trainer: any
  name: any
  constructor(
    private clipboard: Clipboard,
    private pokemonService: Pokemon,
    private trainerService: Trainer,
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) {
    this.name = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    this.retrieveTrainer();
  }
  retrieveTrainer(): void {
    this.trainerService.getOneTrainer(this.name).subscribe({
      next: (data: any) => {
        this.trainer = data;
      },
      error: (e) => console.error(e)
    });
  }
  hundoHave(region:any,gender:any){
    this.pokemonService.getHundoHave(this.name,region,gender).subscribe({
      next: (data: any) => {
        const pending = this.clipboard.beginCopy(data.message);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            pending.destroy();
            // alert('copied')
            this.toastService.show( {message: 'Copied: '+region+','+gender, header: 'Success', classname: 'bg-success text-light', delay: 3000 });
          }
        };
        attempt();
      },
      error: (e) => {
        console.error(e)
        this.toastService.show( {message: 'Failed: '+region+','+gender, header: 'Success', classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }
  tradeHundoExclude(region:any,gender:any,name:any,exclude:any){
    this.pokemonService.getTradeHundoExclude(name,region,gender,exclude).subscribe({
      next: (data: any) => {
        const pending = this.clipboard.beginCopy(data.message);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            pending.destroy();
            // alert('copied')
            this.toastService.show( {message: 'Copied: '+region+','+gender, header: 'Success', classname: 'bg-success text-light', delay: 3000 });
          }
        };
        attempt();
      },
      error: (e) => {
        console.error(e)
        this.toastService.show( {message: 'Failed: '+region+','+gender, header: 'Success', classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }
  hundoWant(region:any,gender:any){
    this.pokemonService.getHundoWant(this.name,region,gender).subscribe({
      next: (data: any) => {
        const pending = this.clipboard.beginCopy(data.message);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            pending.destroy();
            // alert('copied')
            this.toastService.show( {message: 'Copied: '+region+','+gender, header: 'Success', classname: 'bg-success text-light', delay: 3000 });
          }
        };
        attempt();
      },
      error: (e) => {
        console.error(e)
        this.toastService.show( {message: 'Failed: '+region+','+gender, header: 'Success', classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }
  shiny(search:any){
/*     this.tradeService.getShiny(this.name, search).subscribe({
      next: (data: any) => {
        console.log(data.message)
        const pending = this.clipboard.beginCopy(data.message);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            pending.destroy();
            alert('copied')
          }
        };
        attempt();
      },
      error: (e) => console.error(e)
    }); */
  }
  xxl(search:any){
    this.pokemonService.getTradeXXL(this.name, search).subscribe({
      next: (data: any) => {
        const pending = this.clipboard.beginCopy(data.message);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            pending.destroy();
            // alert('copied')
            this.toastService.show( {message: 'Copied', header: 'Success', classname: 'bg-success text-light', delay: 3000 });
          }
        };
        attempt();
      },
      error: (e) => {
        console.error(e)
        this.toastService.show( {message: 'Failed', header: 'Success', classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }
  xxs(search:any){
    this.pokemonService.getTradeXXS(this.name, search).subscribe({
      next: (data: any) => {
        const pending = this.clipboard.beginCopy(data.message);
        let remainingAttempts = 3;
        const attempt = () => {
          const result = pending.copy();
          if (!result && --remainingAttempts) {
            setTimeout(attempt);
          } else {
            pending.destroy();
            // alert('copied')
            this.toastService.show( {message: 'Copied', header: 'Success', classname: 'bg-success text-light', delay: 3000 });
          }
        };
        attempt();
      },
      error: (e) => {
        console.error(e)
        this.toastService.show( {message: 'Failed', header: 'Success', classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }
}
