import { Pipe, PipeTransform } from '@angular/core';
import { finished } from 'stream';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'completedFilter',
  pure: false
})
export class CompletedFilterPipe implements PipeTransform {

  transform(lists: Lista[], completed: boolean = true): Lista[] {
    return lists.filter(list => list.finished == completed);
  }

}
