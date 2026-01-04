import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHundo'
})
export class FilterHundoPipe implements PipeTransform {

  transform(items: any[], filterBy: string, counter: any, region: string): any[] {
    if (!items || !filterBy) {
      return items;
    }
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(filterBy.toLowerCase()) ||
      item.dex.toString() == filterBy ||
      item.candy.toLowerCase().includes(filterBy.toLowerCase())
    ); // Your filtering logic
    counter[region] = filteredItems.length;
    return filteredItems;
/*     return items.filter(item => 
      item.name.toLowerCase().includes(filterBy.toLowerCase()) ||
      item.dex.toString() == filterBy ||
      item.candy.toLowerCase().includes(filterBy.toLowerCase())
    ); */
  }

}
