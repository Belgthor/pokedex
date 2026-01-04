import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNested',
  standalone: true // Use standalone pipes for better performance and modularity
})
export class FilterNestedPipe implements PipeTransform {
  transform(data: any[], valueToFilter: string): any {
    if (!data || !valueToFilter) {
      return data;
    }
    console.log(data)
    const filteredRegions = data.filter((region) =>
      region.pokemon.some((mon:any) => mon.name.toLowerCase().includes(valueToFilter.toLowerCase()))
    );
    console.log(filteredRegions)
    const filteredRegionsWithFilteredPokemon = data.map((region) => ({
      ...region,
      pokemon: region.pokemon.filter((mon:any) => 
        mon.name.toLowerCase().includes(valueToFilter.toLowerCase()) ||
        mon.dex.toString() == valueToFilter ||
        mon.candy.toLowerCase().includes(valueToFilter.toLowerCase()) ||
        (mon.costumeName && mon.costumeName.toLowerCase().includes(valueToFilter.toLowerCase()))
      ),
    })).filter((region) => region.pokemon.length > 0)
    return filteredRegionsWithFilteredPokemon
  }
}