import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../services/pokemon';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all',
  imports: [CommonModule,NgbDatepickerModule],
  templateUrl: './all.html',
  styleUrl: './all.css'
})
export class All {
  pokemon: any[] = []
  filteredItems: any[] = []
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  constructor(private pokemonService: Pokemon){}

  ngOnInit(): void{
    this.loadPokemon();
  }

  loadPokemon(){
      this.pokemonService.getPokemonAll().subscribe((data: any[]) => {
            this.pokemon = data;
            console.log(data)
            this.filteredItems = [...this.pokemon];
          })
  }

  onKeyup(event: KeyboardEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredItems = this.pokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm) || pokemon.candy.toLowerCase().includes(searchTerm)
    );
  }
  
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
