import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(value, 'dd/MM/yyyy');
    return formattedDate || value;
  }
}
