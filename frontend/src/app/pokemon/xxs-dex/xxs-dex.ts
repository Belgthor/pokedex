import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { FilterNestedPipe } from '../../pipes/filter-nested-pipe';
import { Pokemon } from '../../services/pokemon';
import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-xxs-dex',
  imports: [
    CommonModule,
    FormsModule,
    NgbAccordionModule,
    FilterNestedPipe
  ],
  templateUrl: './xxs-dex.html',
  styleUrl: './xxs-dex.css'
})
export class XxsDex {
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
    this.pokemonService.getXXS().subscribe((data: any[]) => {
      this.pokemon = data;
      this.loading = false
    })
  }
  sortTrainer(myArray:any){
    // console.log(myArray.sort((a:any, b:any) => a.name.localeCompare(b.name)))
    return myArray.sort((a:any, b:any) => a.name.localeCompare(b.name))
  }
  totalCheck(myArray:any){
    const totalItems = myArray.reduce((count:any, Arrayobj:any) => {
      let found = Arrayobj.trainer.find((obj:any) => obj.name == this.trainer && obj.xxs === true)
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
  getRegionCount(region:any){
    const foundObject = this.pokemon.find(item => item._id == region);
    const filterObject = foundObject.pokemon.filter((item:any) => item.release === true).length
    return filterObject
  }
  xxlCheck(trainer: any){
    let found = trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      return found.xxs
    }
    return false
  }
  updateXXS(mon:any){
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      found.xxs = found.xxs ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{xxs:found.xxs}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    } else{
      this.pokemonService.updatePokemon(mon._id,this.trainer,{xxs:true}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    }
  }
}
