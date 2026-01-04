import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbScrollSpyModule } from '@ng-bootstrap/ng-bootstrap';
import { Pokemon } from '../../services/pokemon';

@Component({
  selector: 'app-lucky-dex',
  imports: [CommonModule,NgbAccordionModule,NgbScrollSpyModule,FormsModule],
  templateUrl: './lucky-dex.html',
  styleUrl: './lucky-dex.css'
})
export class LuckyDex {
  pokemon: any[] = []
  constructor(private pokemonService: Pokemon){}

  ngOnInit(): void{
    this.loadPokemon();
  }

  loadPokemon(){
      this.pokemonService.getPokemonLucky().subscribe((data: any[]) => {
            this.pokemon = data;
                console.log(data)
          })
  }
}
