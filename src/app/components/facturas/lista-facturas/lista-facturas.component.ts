import {Component, OnInit} from '@angular/core';
import { FacturarComponent } from '../facturar/facturar.component';
import {Facturas} from "../../../entities/facturas";
import {FacturasService} from "../../../services/facturas.service";
import {Detalle} from "../../../entities/detalle";
import {Cliente} from "../../../entities/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {Router} from "@angular/router";
import { create } from 'xmlbuilder2';

import {toolbox} from "../../../utiles/toolbox";

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent implements OnInit{
  facturas: Facturas[];
  xmlOutput: string;
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
      toolbox.printf(toolbox.colors.ORANGE+ "Obtengo los datos del cliente al detallar:");
      console.log(data);
      this.cliente = data;
    });
  }

  pdf(idFactura: number) {

  }

  xml(idFactura: number) {
    this.facturasServicio.getFacturaPorId(idFactura).subscribe(factura => {
      this.facturasServicio.obtenerDetallesDeFactura(idFactura).subscribe(detalles => {
        const doc = create({version: '1.0'})
          .ele('factura', {
            'id': factura.idFactura,
            'identificacionUsuario': factura.identificacionUsuario,
            'identificacionCliente': factura.identificacionCliente,
            'valorTotal': factura.valorTotal,
            'fecha': factura.fecha
          })
          .ele('detalles');

        detalles.forEach(detalle => {
          doc.ele('detalle', {
            'numDetalle': detalle.numDetalle,
            'codigoProducto': detalle.codigoProducto,
            'cantidad': detalle.cantidad,
            'descripcionDetalle': detalle.descripcionDetalle,
            'valorProductos': detalle.valorProductos
          });
        });

        const xmlString = doc.end({prettyPrint: true});
        const xmlBlob = new Blob([xmlString], {type: 'application/xml'});
        const xmlUrl = URL.createObjectURL(xmlBlob);

        const link = document.createElement('a');
        link.href = xmlUrl;
        link.download = 'factura.xml';
        document.body.appendChild(link);

        link.click();
        URL.revokeObjectURL(xmlUrl);

        document.body.removeChild(link);
      });
    });
  }
}
