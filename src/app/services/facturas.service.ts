import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private baseURL = 'http://localhost:8080/api/factura-electronica/facturas';

  constructor(private httpClient:HttpClient) { }


}
