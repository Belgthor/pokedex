import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Pokemon } from '../../services/pokemon';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbAccordionDirective, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { FilterNestedPipe } from '../../pipes/filter-nested-pipe';
import { SocketService } from '../../services/socket';

@Component({
  selector: 'app-trainer-dex',
  imports: [
    FormsModule,
    NgbAccordionModule,
    FilterNestedPipe,
    CommonModule
  ],
  templateUrl: './trainer-dex.html',
  styleUrl: './trainer-dex.css'
})
export class TrainerDex {
  @ViewChild('accordion') accordion: NgbAccordionDirective | undefined;
  private modalService = inject(NgbModal);
  loading: boolean = true
  trainer: any
  data: any[] = []
  // data2: any[] = []
  dex: any
  searchText: string = ''
  selectShiny: any
  error: any
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pokemonService: Pokemon,
    private socketService: SocketService,
  ){}
  ngOnInit(): void{
    this.trainer = this.route.snapshot.paramMap.get('name');
    this.dex = this.router.url.split('?')[0].split('/').pop();
    this.loadPokemon();
    this.socketService.onUpdatePokemon((data: any) => {
      this.loadPokemon();
    });
  }
  loadPokemon(){
    if(this.dex === 'hundo'){
      this.pokemonService.getHundo().subscribe((data: any[]) => {
        this.data = data;
        // this.data2 = data;
        this.loading = false
      })
    }else if(this.dex === 'xxl'){
      this.pokemonService.getXXL().subscribe((data: any[]) => {
        this.data = data;
        // this.data2 = data;
        this.loading = false
      })
    }else if(this.dex === 'xxs'){
      this.pokemonService.getXXS().subscribe((data: any[]) => {
        this.data = data;
        this.loading = false
      })
    }else if(this.dex === 'shiny'){
      this.pokemonService.getTrainerShiny().subscribe((data: any[]) => {
      this.data = data;
      this.loading = false
    })
    }else if(this.dex === 'lucky'){
      this.pokemonService.getTrainerLucky().subscribe((data: any[]) => {
        this.data = data;
        this.loading = false
      })
    }else if(this.dex === 'perfect'){
      this.pokemonService.getTrainerPerfect().subscribe(
        {
      next: (data) => {
        this.data = data;
        this.loading = false
      },
      error: (error) => {
        console.log(error)
      },
    }
      //   (data: any[]) => {
      //   this.data = data;
      //   this.loading = false
      // }
    )
    }else if(this.dex === 'costume'){
      this.pokemonService.getTrainerCostume().subscribe((data: any[]) => {
        this.data = data;
        this.loading = false
      })
    }else{
      this.loading = false
    }
  }
  filterMain(array:any){
    const foundItemByName = array.find((item: any) => item.mainDex == true);
    // const filteredItems = array.filter((item: any) => item.mainDex === true);
    // console.log(foundItemByName)
    return foundItemByName
  }
  onKeyup(event: KeyboardEvent): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if(searchTerm != ''){
      this.accordion?.expandAll();
    }else{
      this.accordion?.collapseAll()
    }
  }
  checkDex(trainer: any){
    let found = trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      return found[this.dex]
    }
    return false
  }
  isShiny(trainer: any){
    let found = trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      return found.shiny
    }
    return false
  }
  checkShiny(Arrayobj: any){
    let found = null
    let count = 0
    let btn = 'btn-danger'
    // console.log(Arrayobj.length)
    for (const prop in Arrayobj) {
      found = Arrayobj[prop].trainer.find((obj:any) => obj.name == this.trainer && obj[this.dex] === true)
      // console.log(Arrayobj[prop].name + ' - ' + found)
      if(found){
        count = count + 1;
        // btn = 'btn-warning'
        // console.log(btn)
        // return btn
      }
    }
    // console.log(count)
    if(count == Arrayobj.length){
      btn = 'btn-success'
    }else if(count == 0){
      btn = 'btn-danger'
    }else{
      btn = 'btn-warning'
    }
    return btn
  }
  totalHave(myArray:any){
    const totalItems = myArray.reduce((count:any, Arrayobj:any) => {
      let found = Arrayobj.trainer.find((obj:any) => obj.name == this.trainer && obj[this.dex] === true)
      if(found){
        return count + 1;
      }
      return count;
    }, 0);
    return totalItems
  }
  totalHave2(myArray:any){
    // console.log(myArray)
    if(this.dex === 'shiny'){
      let regionData = this.data.find((obj:any) => obj._id == myArray)
      let found = null
      // console.log(regionData.pokemon)
      const totalItems = regionData.pokemon.reduce((count:any, Arrayobj:any) => {
        for (const prop in Arrayobj.pokemon) {
          found = Arrayobj.pokemon[prop].trainer.find((obj:any) => obj.name == this.trainer && obj[this.dex] === true)
          if(found){
            return count + 1
          }
        }
        return count
      }, 0);
      return totalItems
    }else{
      let regionData = this.data.find((obj:any) => obj._id == myArray)
      // console.log(regionData)
      const totalItems = regionData.pokemon.reduce((count:any, Arrayobj:any) => {
        let found = Arrayobj.trainer.find((obj:any) => obj.name == this.trainer && obj[this.dex] === true)
        if(found){
          return count + 1;
        }
        return count;
      }, 0);
      return totalItems
    }
  }
  totalList(myArray:any){
    const totalItems = myArray.reduce((count:any, Arrayobj:any) => {
      if(Arrayobj.release){
        return count + 1;
      }
      return count;
    }, 0);
    return totalItems
  }
  totalList2(myArray:any){
    if(this.dex === 'shiny'){
      let regionData = this.data.find((obj:any) => obj._id == myArray)
      let found = null
      const totalItems = regionData.pokemon.reduce((count:any, Arrayobj:any) => {
        for (const prop in Arrayobj.pokemon) {
          // found = Arrayobj.pokemon[prop].trainer.find((obj:any) => obj.name == this.trainer && obj[this.dex] === true)
          if( Arrayobj.pokemon[prop].releaseShiny){
            return count + 1
          }
        }
        return count
      }, 0);
      return totalItems
    }else{
      let regionData =  this.data.find((obj:any) => obj._id == myArray)
      const totalItems = regionData.pokemon.reduce((count:any, Arrayobj:any) => {
        if(Arrayobj.release){
          return count + 1;
        }
        return count;
      }, 0);
      return totalItems
    }
  }
  updateShiny(mon:any){
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    var testFound
    if(found){
      testFound = found.shiny ? false : true;
      // found[this.dex] = found[this.dex] ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{shiny:testFound}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    } else{
      // console.log(mon)
      let trainer = {
        name: this.trainer,
        shiny: true
      }
      mon.trainer.push(trainer)
      this.pokemonService.updatePokemon(mon._id,this.trainer,{shiny:true}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    }
  }
  updateDex(mon:any){
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    var testFound
    if(found){
      testFound = found[this.dex] ? false : true;
      // found[this.dex] = found[this.dex] ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{[this.dex]:testFound}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    } else{
      // console.log(mon)
      let trainer = {
        name: this.trainer,
        [this.dex]: true
      }
      mon.trainer.push(trainer)
      this.pokemonService.updatePokemon(mon._id,this.trainer,{[this.dex]:true}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
        },
        error: (e) => console.error(e)
      })
    }
  }
  updateHundo(mon:any, gender:any){
    console.log('updateHundo')
    let found = mon.trainer.find((obj:any) => obj.name == this.trainer)
    if(found){
      found[gender] = found[gender] ? false : true;
      this.pokemonService.updatePokemon(mon._id,found.name,{[gender]:found[gender]}).subscribe({
        next: (data: any) => {
          this.socketService.updatePokemon(mon._id);
          // console.log(mon._id)
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
    // console.log(trainer)
    if(found){
      return found[gender]
    }
    return false
  }
  openScrollableContent(longContent:any, obj:any) {
    this.selectShiny = obj
		this.modalService.open(longContent, { scrollable: true, fullscreen: true });
	}
}
