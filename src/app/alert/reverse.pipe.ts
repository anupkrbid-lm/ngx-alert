import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  pure: true
})
export class ReversePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.reverse();
  }

}
