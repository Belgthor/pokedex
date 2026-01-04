import { Component } from '@angular/core';
import { Pokemon } from '../../services/pokemon';
import { Clipboard, ClipboardModule  } from '@angular/cdk/clipboard';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-trash-hundo',
  imports: [
    ClipboardModule
  ],
  templateUrl: './trash-hundo.html',
  styleUrl: './trash-hundo.css'
})
export class TrashHundo {
  value = 'Testing'
  message:string = ''
  constructor(
    private clipboard: Clipboard,
    private pokemonService: Pokemon,
    private toastService: ToastService
  ) {}
  trash2(name1:any,name2:any,region:any,gender:any){
    this.pokemonService.getTrash2(name1,name2,region,gender).subscribe({
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
      error: (e) => console.error(e)
    });
  }
  trash3(name1:any,name2:any,name3:any,region:any,gender:any){
    this.pokemonService.getTrash3(name1,name2,name3,region,gender).subscribe({
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
      error: (e) => console.error(e)
    });
  }
  trash4(name1:any,name2:any,name3:any,name4:any,region:any,gender:any){
    this.pokemonService.getTrash4(name1,name2,name3,name4,region,gender).subscribe({
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
      error: (e) => console.error(e)
    });
  }
}
