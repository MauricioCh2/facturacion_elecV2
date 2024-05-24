import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cliente} from "../entities/cliente";
import {Productos} from "../entities/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseURL = 'http://localhost:8080/api/factura-electronica/productos';
  constructor(private  httpClient: HttpClient) { }

  getProductosByProveedorId(id:String){
    return this.httpClient.get<Productos>(`${this.baseURL}/${id}`);
  }

  registrarProductoPorId( producto: Productos){
    return this.httpClient.post(`${this.baseURL}`, producto);
  }
}
