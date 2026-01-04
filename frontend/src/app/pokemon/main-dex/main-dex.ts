import { Component, ViewChild, inject, Input, signal, TemplateRef, WritableSignal, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAccordionDirective} from '@ng-bootstrap/ng-bootstrap';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from '../../services/pokemon';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-dex',
  imports: [
    NgbDatepickerModule,
    CommonModule,NgbAccordionModule,NgbScrollSpyModule,FormsModule,FilterByPipe],
  templateUrl: './main-dex.html',
  styleUrl: './main-dex.css'
})
export class MainDex {
  @ViewChild('accordion') accordion: NgbAccordionDirective | undefined;
  pokemon: any[] = []
  filteredItems: any[] = []
  searchText: string = ''
  foundPokemon: string = ''
  activePanelIds: string[] = []
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
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

  constructor(
    private pokemonService: Pokemon,
    private elementRef: ElementRef
  ){}

  ngOnInit(): void{
    this.loadPokemon();
  }

  loadPokemon(){
      this.pokemonService.getPokemonMain().subscribe((data: any[]) => {
            this.pokemon = data;
                console.log(data)
          })
  }
  onKeyup(event: KeyboardEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if(searchTerm != ''){
      this.accordion?.expandAll();
    }else{
      this.accordion?.collapseAll()
    }
  }

  getRegionCount(region:any){
    //this.foundPokemon = this.pokemon.find(item => item.id === region);
    const foundObject = this.pokemon.find(item => item._id == region);
    const filterObject = foundObject.pokemon.filter((item:any) => item.release === true).length
    return filterObject
    //return this.pokemon[region].pokemon.length
    //return this.pokemon[region].pokemon.filter((item:any) => item.release === true).length
  }
}
