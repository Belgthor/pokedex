import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { FilterNestedPipe } from '../../pipes/filter-nested-pipe';
import { Pokemon } from '../../services/pokemon';
import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-trainer-lucky',
  imports: [
    CommonModule,
    FormsModule,
    NgbAccordionModule,
    FilterNestedPipe
  ],
  templateUrl: './trainer-lucky.html',
  styleUrl: './trainer-lucky.css'
})
export class TrainerLucky {
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
    this.pokemonService.getTrainerLucky().subscribe((data: any[]) => {
      this.pokemon = data;
      this.loading = false
    })
  }
  totalCheck(myArray:any){
    const totalItems = myArray.reduce((count:any, Arrayobj:any) => {
      let found = Arrayobj.trainer.find((obj:any) => obj.name == this.trainer && obj.lucky === true)
      if(found){
        return count + 1;
      }
      return count;
    }, 0);
    return totalItems
  }
  onKeyup(event: KeyboardEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if(searchTerm != ''){
      this.accordion?.expandAll();
    }else{
      this.accordion?.collapseAll()
    }
  }
  getRegionCount(myArray:any){
    const totalItems = myArray.reduce((count:any, Arrayobj:any) => {
      // let found = Arrayobj.trainer.find((obj:any) => obj.name == this.trainer && obj.lucky === true)
      if(Arrayobj.release){
        return count + 1;
      }
      return count;
    }, 0);
    return totalItems
  }
  check(trainer: any){
    let found = trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      return found.lucky
    }
    return false
  }
  update(mon:any){
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      found.lucky = found.lucky ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{lucky:found.lucky}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    } else{
      this.pokemonService.updatePokemon(mon._id,this.trainer,{lucky:true}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    }
  }
}
