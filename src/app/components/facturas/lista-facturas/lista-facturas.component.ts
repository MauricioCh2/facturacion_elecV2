import {Component, OnInit} from '@angular/core';
import {Facturas} from "../../../entities/facturas";
import {FacturasService} from "../../../services/facturas.service";
import {Detalle} from "../../../entities/detalle";
import {Cliente} from "../../../entities/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent implements OnInit{
  facturas: Facturas[];
  factura : Facturas;
  cliente : Cliente;
  detalles : Detalle[];

  constructor(private facturasServicio: FacturasService,private clienteService: ClienteService, private router:Router){
    this.detalles = [];
    this.factura = new Facturas();
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  private obtenerFacturas(){
    this.facturasServicio.getListaFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

  detallar(idFactura: number) {
    this.facturasServicio.getDetallesByFacturaId(idFactura).subscribe(data => {
      this.detalles = data;
    });
    this.facturasServicio.getFacturaById(idFactura).subscribe(data => {
      this.factura = data;
    });
    this.clienteService.getClienteById(this.factura.identificacionCliente).subscribe(data => {
      this.cliente = data;
    });
  }

  pdf(idFactura: number) {

  }

  xml(idFactura: number) {

  }
}
