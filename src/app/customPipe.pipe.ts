import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'alphaNum'
})
export class AlphaNumPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/[^a-zA-Z0-9 ]/g, '');
  }

}
