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
@Pipe({
  name: 'cedulaFormat'
})
export class CedulaFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    let formatted = value.replace(/\D/g, '');
    if (formatted.length > 1) {
      formatted = formatted.slice(0, 1) + '-' + formatted.slice(1);
    }
    if (formatted.length > 6) {
      formatted = formatted.slice(0, 6) + '-' + formatted.slice(6, 9);
    }
    return formatted;
  }
}
@Pipe({
  name: 'telefonoFormat'
})
export class telefonoFormatPipe implements PipeTransform{

  transform(value: string): string {
    // Eliminar todos los caracteres que no sean dígitos
    const cleanedValue = value.replace(/\D/g, '');

    // Aplicar el formato deseado
    if (cleanedValue.length === 8) {
      return cleanedValue.slice(0, 4) + '-' + cleanedValue.slice(4);
    } else if (cleanedValue.length === 10) {
      return cleanedValue.slice(0, 1) + '-' + cleanedValue.slice(1, 4) + '-' + cleanedValue.slice(4, 8);
    } else if (cleanedValue.length === 12) {
      return cleanedValue.slice(0, 4) + '-' + cleanedValue.slice(4, 7) + '-' + cleanedValue.slice(7);
    }

    // Si el número no tiene un formato esperado, devolverlo sin cambios
    return value;
  }

}
