import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../services/pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade-view',
  imports: [
    CommonModule
  ],
  templateUrl: './trade-view.html',
  styleUrl: './trade-view.css'
})
export class TradeView {
  pokemon: any[] = []
  name: any
  dex: any
  loading= true
  constructor(
    private pokemonService: Pokemon,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void{
    this.name = this.route.snapshot.params['name'];
    this.dex = this.route.snapshot.params['dex'];
    this.loadPokemon();
  }

  loadPokemon(){
    var fruits: any[] = ['xxl','xxs']
    if(fruits.includes(this.dex)){
      this.pokemonService.getView(this.name, this.dex).subscribe((data: any[]) => {
        this.pokemon = data;
        this.loading = false
        console.log(data)
      })
    }
  }
}
