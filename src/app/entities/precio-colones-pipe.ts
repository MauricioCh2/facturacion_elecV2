// export class PrecioColonesPipe {
// }

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'precioColones'})
export class PrecioColonesPipe implements PipeTransform {
  transform(value: number): string {
    if (value != null) {
      return value.toLocaleString('es-CR') + ' colones';
    }
    return null;
  }
} 
