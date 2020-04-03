import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'elements'
})
export class ElementPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return _.values(value);
  }

}
