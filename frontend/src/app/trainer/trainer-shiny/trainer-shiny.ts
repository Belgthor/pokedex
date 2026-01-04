import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { FilterNestedPipe } from '../../pipes/filter-nested-pipe';
import { Pokemon } from '../../services/pokemon';
import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-trainer-shiny',
  imports: [
    CommonModule,
    FormsModule,
    NgbAccordionModule,
    FilterNestedPipe
  ],
  templateUrl: './trainer-shiny.html',
  styleUrl: './trainer-shiny.css'
})
export class TrainerShiny {
  @ViewChild('accordion') accordion: NgbAccordionDirective | undefined;
  loading: boolean = true
  pokemon: any[] = []
  trainer: any
  searchText: string = ''
  constructor(
    private pokemonService: Pokemon,
    private route: ActivatedRoute,
    private socketService: SocketService,
  ){}
  ngOnInit(): void{
    this.trainer = this.route.snapshot.paramMap.get('name');
    this.loadPokemon();
    this.socketService.onUpdatePokemon((data: any) => {
      this.loadPokemon();
    });
  }
  loadPokemon(){
    this.pokemonService.getTrainerShiny().subscribe((data: any[]) => {
      this.pokemon = data;
      this.loading = false
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
  shinyCheck(trainer: any){
    let found = trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      return found.shiny
    }
    return false
  }
  updateShiny(mon:any){
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      found.shiny = found.shiny ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{shiny:found.shiny}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    } else{
      this.pokemonService.updatePokemon(mon._id,this.trainer,{shiny:true}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    }
  }
}
