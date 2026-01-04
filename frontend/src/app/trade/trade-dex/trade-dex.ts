import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../services/pokemon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trade-dex',
  imports: [
    FormsModule,
    FilterByPipe,
    CommonModule
  ],
  templateUrl: './trade-dex.html',
  styleUrl: './trade-dex.css'
})
export class TradeDex {
  errorMsg = ''
  loading = true
  searchText: string = ''
  pokemon: any[] = []
  search: any
  name: any
  dex: any
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private pokemonService: Pokemon,
    private route: ActivatedRoute,
    private router: Router,
  ){
    this.activatedRoute.params.subscribe((params) => {
      this.search = params['search']
      this.name = params['name']
      this.dex = this.router.url.split(';')[0].split('/').pop();
    });
  }
  ngOnInit(): void{
    this.loadPokemon();
  }
  loadPokemon(){
    if(this.dex === 'lucky'){
      this.pokemonService.getViewLucky(this.name, this.search).subscribe((data: any[]) => {
        this.pokemon = data;
        this.loading = false

        console.log(data)
      })
    }else if(this.dex === 'perfect'){
      this.pokemonService.getViewPerfect(this.name, this.search).subscribe((data: any[]) => {
        this.pokemon = data;
        this.loading = false

        console.log(data)
      })
    }else if(this.dex === 'shiny'){
      this.pokemonService.getTradeShiny(this.name, this.search)
      .subscribe({
        next: (data) => {
          console.log('Received value:', data)
          this.pokemon = data;
          this.loading = false
        },
        error: (err) => {
          console.error('Error in subscribe after catchError:', err)
          // this.pokemon = err.headers
          this.errorMsg = "........Error"
        },
        complete: () => console.log('Observable completed.')
      });
    }
    // .subscribe((data: any[]) => {
    //   if(data[0].error == 'error'){
    //     this.loading = false
    //   }else{
    //     this.pokemon = data;
    //     this.loading = false
    //   }
    //   console.log(data)
    // })
  }
}
