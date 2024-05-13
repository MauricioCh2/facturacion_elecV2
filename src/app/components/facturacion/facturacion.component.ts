import {Component, OnInit} from '@angular/core';
import {Facturas} from "../../entities/facturas";
import {UsuarioService} from "../../services/usuario.service";
import {Router} from "@angular/router";
import {FacturasService} from "../../services/facturas.service";

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent implements OnInit{
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
}
