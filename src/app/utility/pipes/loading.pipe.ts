import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { startWith, map, catchError } from 'rxjs/operators';

@Pipe({
  name: 'loading'
})
export class LoadingPipe implements PipeTransform {

  transform(val:any, ...args:any[]):any {
    return isObservable(val)
    ? val.pipe(
      map((value: any) => ({
        loading: value.type === 'start',
        value: value.type ? value.value : value
      })),
      startWith({ loading: true }),
      catchError(error => of({ loading: false, error }))
    )
    : val;
  }

}
