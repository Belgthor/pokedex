import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Trainer } from '../../services/trainer';
import { Pokemon } from '../../services/pokemon';
import { Clipboard  } from '@angular/cdk/clipboard';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-trade-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './trade-menu.html',
  styleUrl: './trade-menu.css'
})
export class TradeMenu {
  trainer: any
  name: any
  constructor(
    private clipboard: Clipboard,
    private pokemonService: Pokemon,
    private trainerService: Trainer,
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) {
    this.name = this.route.snapshot.params['name'];
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
