import { Component, Input, OnInit } from '@angular/core';
import {Detalle} from "../entities/detalle";
import {Facturas} from "../entities/facturas";
import {Cliente} from "../entities/cliente";
@Component({
  selector: 'app-detalles-factura',
  templateUrl: './detalles-factura.component.html',
  styleUrl: './detalles-factura.component.css'
})
export class DetallesFacturaComponent implements OnInit{

  @Input() detalles: Detalle[];
  @Input() factura: Facturas;
  @Input() cliente: Cliente;
  constructor() { }

  ngOnInit(): void {
  }
}
