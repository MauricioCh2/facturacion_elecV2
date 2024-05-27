// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
//
//
// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })
// export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrecioColonesPipe, CedulaFormatPipe, telefonoFormatPipe } from '../entities/precio-colones-pipe'; // Ajusta la ruta según tu estructura de carpetas

@NgModule({
  declarations: [
    PrecioColonesPipe,
    CedulaFormatPipe,
    telefonoFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PrecioColonesPipe,
    CedulaFormatPipe,
    telefonoFormatPipe
  ]
})
export class SharedModule { }
