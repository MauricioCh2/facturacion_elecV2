import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cliente} from "../entities/cliente";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseURL = 'http://localhost:8080/api/factura-electronica/clientes';
  constructor(private httpClient:HttpClient) { }

  getClientesByProveedorId(id: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseURL}/${id}`);
  }
 




}
