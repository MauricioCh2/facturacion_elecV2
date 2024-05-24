import {Component, OnInit} from '@angular/core';
import {Facturas} from "../../../entities/facturas";
import {FacturasService} from "../../../services/facturas.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrl: './lista-facturas.component.css'
})
export class ListaFacturasComponent implements OnInit{
  facturas: Facturas[];

  constructor(private facturasServicio: FacturasService, private router:Router){
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
    
  }

  pdf(idFactura: number) {
    
  }

  xml(idFactura: number) {
    
  }
}
