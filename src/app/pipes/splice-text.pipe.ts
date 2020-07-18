import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spliceText'
})
export class SpliceTextPipe implements PipeTransform {

  transform(text: string, maxLength: number = 0): String {
    if (!text) return '';
    if (maxLength === 0) return text;
    if (text.length <= maxLength) return text;

    return `${text.substring(0, maxLength-1)} ...`
  }

}
