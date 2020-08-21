import { Pipe, PipeTransform } from '@angular/core';

import { sortBy as _sortBy } from 'lodash';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _sortBy(value, [args]);
  }
}
