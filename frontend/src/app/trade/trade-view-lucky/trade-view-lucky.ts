import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../services/pokemon';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trade-view-lucky',
  imports: [
    CommonModule,
    FormsModule,
    FilterByPipe,
    DatePipe
  ],
  templateUrl: './trade-view-lucky.html',
  styleUrl: './trade-view-lucky.css'
})
export class TradeViewLucky {
  search: any
  searchText: string = ''
  private activatedRoute = inject(ActivatedRoute);
  pokemon: any[] = []
  name: any
  loading= true
  constructor(
    private pokemonService: Pokemon,
    private route: ActivatedRoute,
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.search = params['search']
      this.name = params['name']
    });
  }
  ngOnInit(): void{
    this.loadPokemon();
  }
  loadPokemon(){
    this.pokemonService.getViewLucky(this.name, this.search).subscribe((data: any[]) => {
      this.pokemon = data;
      this.loading = false

      console.log(data)
    })
  }
  hundoCheck(trainer: any, gender: any){
    let found = trainer.find((obj:any) => obj.name == this.name)
    console.log(trainer)
    if(found){
      return found[gender]
    }
    return false
  }
  sortByDexAscending(): void {
    // this.pokemon.sort((a, b) => a.dex - b.dex);
    this.pokemon.sort((a, b) => a.releaseDate.getTime() - b.releaseDate.getTime());
  }

  sortByDateDescending(): void {
    // this.pokemon.sort((a, b) => b.dex - a.dex);
    this.pokemon.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
  }
  sortTasks(direction: 'asc' | 'desc'): void {
    this.pokemon.sort((a, b) => {
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : Number.MAX_SAFE_INTEGER;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : Number.MAX_SAFE_INTEGER;
      if (direction === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }
  sortTasks2(direction: 'asc' | 'desc'): void {
    this.pokemon.sort((a, b) => {
      const dateA = a.dex
      const dateB = b.dex
      if (direction === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }
}
