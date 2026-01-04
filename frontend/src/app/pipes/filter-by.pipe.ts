import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(items: any[], filterBy: string): any[] {
    if (!items || !filterBy) {
      return items;
    }
    if(items.length === 0) {
      return [-1];
    }
    return items.filter(item => 
      item.name.toLowerCase().includes(filterBy.toLowerCase()) ||
      item.dex.toString() == filterBy ||
      item.candy.toLowerCase().includes(filterBy.toLowerCase()) ||
      (item.costumeName && item.costumeName.toLowerCase().includes(filterBy.toLowerCase()))/*  ||
      item.costumeName.toLowerCase().includes(filterBy.toLowerCase()) ||
      item.formName.toLowerCase().includes(filterBy.toLowerCase()) */
    );
  }

}
