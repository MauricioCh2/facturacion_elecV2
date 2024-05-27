import {Component, OnInit} from '@angular/core';
import { FacturarComponent } from '../facturar/facturar.component';
import {Facturas} from "../../../entities/facturas";
import {FacturasService} from "../../../services/facturas.service";
import {Detalle} from "../../../entities/detalle";
import {Cliente} from "../../../entities/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {Usuario} from "../../../entities/usuario";
import {UsuarioService} from "../../../services/usuario.service";
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
  factura: Facturas;
  cliente: Cliente;
  usuario: Usuario;
  detalles: Detalle[];

  constructor(private facturasServicio: FacturasService, private clienteService: ClienteService, private usuarioService: UsuarioService, private router: Router) {
    this.detalles = [];
    this.factura = new Facturas();
    this.cliente = new Cliente();
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  private obtenerFacturas(){
    this.facturasServicio.getListaFacturas().subscribe(data => {
      this.facturas = data;
    });
  }

  detallar(fac: Facturas) {
    this.facturasServicio.getDetallesByFacturaId(fac.idFactura).subscribe(data => {
      this.detalles = data;
    });
    this.facturasServicio.getFacturaById(fac.idFactura).subscribe(data => {
      this.factura = data;
    });
    this.clienteService.getClienteById(fac.identificacionCliente).subscribe(data => {
      toolbox.printf(toolbox.colors.ORANGE+ "Obtengo los datos del cliente al detallar:");
      console.log(data);
      this.cliente = data;
    });
  }

  pdf(idFactura: number) {

  }

  xml(idFactura: number) {
    this.facturasServicio.getFacturaById(idFactura).subscribe(factura => {
      this.facturasServicio.getDetallesByFacturaId(idFactura).subscribe(detalles => {
        this.clienteService.getClienteById(factura.identificacionCliente).subscribe(cliente => {
          this.usuarioService.getUsuarioById(factura.identificacionUsuario).subscribe(usuario => {
            const doc = create({version: '1.0'})
              .ele('factura', {
                'id': factura.idFactura
              })
              .ele('Fecha').txt(String(factura.fecha)).up()
              .ele('Proveedor')
                .ele('IdProveedor').txt(factura.identificacionUsuario).up()
                .ele('Nombre').txt(usuario.nombre).up()
                .ele('TipoCedula').txt(usuario.tipoCedula).up()
                .up()

              .ele('Cliente')
                .ele('Identificacion').txt(cliente.identificacionC).up()
                .ele('Nombre').txt(cliente.nombreC).up()
                .ele('Correo').txt(cliente.correo).up()
                .ele('Telefono').txt(cliente.telefono).up()
                .up()

              .ele('Detalles');
            detalles.forEach(detalle => {
              doc.ele('Detalle')
                .ele('NumDetalle').txt(String(detalle.numDetalle)).up()
                .ele('CodigoProducto').txt(String(detalle.codigoProducto)).up()
                .ele('Cantidad').txt(String(detalle.cantidad)).up()
                .ele('Descripcion').txt(detalle.descripcionDetalle).up()
                .ele('Valor')
                .ele('ValorProducto').txt(String(detalle.valorProductos)).up()
                .ele('Divisa').txt("colones").up()
                .up();
            });


              doc.ele('ValorTotal')
                .ele('MontoTotal').txt(String(factura.valorTotal)).up()
                .ele('Divisa').txt("colones").up()

            const xmlString = doc.end({prettyPrint: true});
            const xmlBlob = new Blob([xmlString], {type: 'application/xml'});
            const xmlUrl = URL.createObjectURL(xmlBlob);

            const link = document.createElement('a');
            link.href = xmlUrl;
            //link.download = 'factura.xml';
            document.body.appendChild(link);

            window.open(xmlUrl, '_blank');

          });
        });
      });
    });
  }
}
