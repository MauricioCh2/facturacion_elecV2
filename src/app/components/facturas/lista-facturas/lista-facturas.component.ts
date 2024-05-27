import {Component, OnInit} from '@angular/core';
import {FacturarComponent} from '../facturar/facturar.component';
import {Facturas} from "../../../entities/facturas";
import {FacturasService} from "../../../services/facturas.service";
import {Detalle} from "../../../entities/detalle";
import {Cliente} from "../../../entities/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {Usuario} from "../../../entities/usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {Router} from "@angular/router";
import {create} from 'xmlbuilder2';

import {toolbox} from "../../../utiles/toolbox";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import * as jspdf from "jspdf";
import jsPDF from "jspdf";
import {ProductoService} from "../../../services/producto.service";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent implements OnInit {
  facturas: Facturas[];
  xmlOutput: string;
  factura: Facturas;
  cliente: Cliente;
  usuario: Usuario;
  detalles: Detalle[];

  constructor(private facturasServicio: FacturasService, private clienteService: ClienteService, private usuarioServicie: UsuarioService, private router: Router) {
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

  detallar(fac: Facturas) {
    this.facturasServicio.getDetallesByFacturaId(fac.idFactura).subscribe(data => {
      this.detalles = data;
    });
    this.facturasServicio.getFacturaById(fac.idFactura).subscribe(data => {
      this.factura = data;
    });
    this.clienteService.getClienteById(fac.identificacionCliente).subscribe(data => {
      toolbox.printf(toolbox.colors.ORANGE + "Obtengo los datos del cliente al detallar:");
      console.log(data);
      this.cliente = data;
    });
  }

  pdf(idFactura: number) {
    this.facturasServicio.getFacturaById(idFactura).subscribe(factura => {
      this.facturasServicio.getDetallesByFacturaId(idFactura).subscribe(detalles => {
        this.clienteService.getClienteById(factura.identificacionCliente).subscribe(cliente => {
          this.usuarioServicie.getUsuarioById(factura.identificacionUsuario).subscribe(proveedor => {

            const doc = new jsPDF();
            let posY = 15;

            doc.setFontSize(20);
            doc.text("Factura Electronica ", 70, posY);

            doc.addImage(`assets/images/img.png`, 'PNG', 160, 5, 40, 40);
            posY += 15;

            doc.setFontSize(12);
            doc.text("Fecha: " + `${factura.fecha}`, 10, posY);
            posY += 5;
            doc.text("Numero de factura: " + `${factura.idFactura}`, 10, posY);
            posY += 15;

            doc.text("Informacion del Cliente:", 10, posY);
            posY += 5;
            doc.text("Nombre: " + `${cliente.nombreC}`, 10, posY);
            posY += 5;
            doc.text("Id: " + `${cliente.idCliente}`, 10, posY);
            posY += 5;
            doc.text("Cedula: " + `${cliente.identificacionC}`, 10, posY);
            posY += 5;
            doc.text("Correo: " + `${cliente.correo}`, 10, posY);
            posY += 5;
            doc.text("Telefono: " + `${cliente.telefono}`, 10, posY);
            posY += 10;

            doc.text("Informacion del Proveedor:", 10, posY);
            posY += 5;
            doc.text("Nombre: " + `${proveedor.nombre}`, 10, posY);
            posY += 15;

            doc.text("Tabla de Informe de venta:", 20, posY);

            posY += 8;
            doc.text("Producto", 20, posY);
            doc.text("Cantidad", 100, posY);
            doc.text("Valor", 130, posY);
            posY += 5;

            detalles.forEach(detalle => {
              doc.text(`${detalle.descripcionDetalle}`, 20, posY);
              doc.text(`${detalle.cantidad}`, 115, posY);
              doc.text(`${detalle.valorProductos} colones`, 130, posY);
              posY += 5;
            });

            posY += 5;
            doc.text(`*** ULTIMA LINEA ***`, 20, posY);
            doc.text("Total:", 100, posY);
            doc.text(`${factura.valorTotal}`, 130, posY);

            posY += 10;
            doc.text(`IVA Incluido en el precio de cada producto e igualmente en el costo final`, 30, posY);

            posY += 5;

            doc.setFontSize(8);
            doc.text(`Emitida conforme lo establecido en la resolución de Facturación Electrónica No. DGT-R-033-2019 del 20-Jun-2019 de la D.G.T,D.
                                      Versión 4.3, Factura electrónica generada por WateCloud (www.watefact.com).`, 15, posY);



            doc.save(`${factura.idFactura}`);
          });
        });
      });
    });
  }

  xml(idFactura: number) {
    this.facturasServicio.getFacturaById(idFactura).subscribe(factura => {
      this.facturasServicio.getDetallesByFacturaId(idFactura).subscribe(detalles => {
        this.clienteService.getClienteById(factura.identificacionCliente).subscribe(cliente => {
          this.usuarioServicie.getUsuarioById(factura.identificacionUsuario).subscribe(usuario => {
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
