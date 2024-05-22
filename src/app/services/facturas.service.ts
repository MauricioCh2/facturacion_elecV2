import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CurrentUserService} from "./current-user.service";
import {Facturas} from "../entities/facturas";
import {Observable} from "rxjs";
import {Detalle} from "../entities/detalle";
import {toolbox} from "../utiles/toolbox";

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private baseURL = 'http://localhost:8080/api/factura-electronica/facturas';

  constructor(private httpClient:HttpClient, private currentUser: CurrentUserService) { }

  getListaFacturas(): Observable<Facturas[]> {
    console.log("estoy en get lista facturas y la voy a pedir de: "+ this.currentUser.getCurrentUser().idUsuario);
    return this.httpClient.get<Facturas[]>(`${this.baseURL}/${this.currentUser.getCurrentUser().idUsuario}`);
  }


  facturar(factura: Facturas, detalles: Detalle[]) {
    let facturaConDetalles = {
      factura: factura,
      detalles: detalles
    };
    console.log(toolbox.colors.BLUE + facturaConDetalles+ toolbox.colors.RESET);
    return this.httpClient.post(`${this.baseURL}`, facturaConDetalles);

  }
}
