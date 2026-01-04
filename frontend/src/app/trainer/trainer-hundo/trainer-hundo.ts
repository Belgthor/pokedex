import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { FilterNestedPipe } from '../../pipes/filter-nested-pipe';
import { Pokemon } from '../../services/pokemon';
import { SocketService } from '../../services/socket';


@Component({
  selector: 'app-trainer-hundo',
  imports: [
    CommonModule,
    FormsModule,
    NgbAccordionModule,
    FilterNestedPipe
  ],
  templateUrl: './trainer-hundo.html',
  styleUrl: './trainer-hundo.css'
})
export class TrainerHundo {
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
    this.pokemonService.getHundo().subscribe((data: any[]) => {
      console.log('loadPokemon')
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
  getRegionCount(region:any){
    const foundObject = this.pokemon.find(item => item._id == region);
    const filterObject = foundObject.pokemon.filter((item:any) => item.release === true).length
    return filterObject
  }
  updateHundo(mon:any, gender:any){
    console.log('updateHundo')
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      found[gender] = found[gender] ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{[gender]:found[gender]}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
          console.log(mon._id)
        },
        error: (e) => console.error(e)
      })
    } else{
      this.pokemonService.updatePokemon(mon._id,this.trainer,{[gender]:true}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    }
  }
  hundoCheck(trainer: any, gender: any){
    let found = trainer.find((obj:any) => obj.name == this.trainer)
    console.log(trainer)
    if(found){
      return found[gender]
    }
    return false
  }
  test(mon:any, gender:any){
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      return found[gender]
    } else {
      return false
    }
  }
}
