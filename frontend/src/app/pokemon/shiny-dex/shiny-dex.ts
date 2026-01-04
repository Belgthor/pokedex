import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from '../../services/pokemon';

@Component({
  selector: 'app-shiny-dex',
  imports: [CommonModule,NgbAccordionModule,NgbScrollSpyModule,FormsModule],
  templateUrl: './shiny-dex.html',
  styleUrl: './shiny-dex.css'
})
export class ShinyDex {
  pokemon: any[] = []
  constructor(private pokemonService: Pokemon){}

  ngOnInit(): void{
    this.loadPokemon();
  }

  loadPokemon(){
      this.pokemonService.getPokemonShiny().subscribe((data: any[]) => {
            this.pokemon = data;
                console.log(data)
          })
  }
}
