import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../entities/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL = 'http://localhost:8080/api/factura-electronica/usuarios';
  constructor(private httpClient:HttpClient) { }
  getUsuariosList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.baseURL}`);
  }
  registrarUsuario(usuario: Usuario): Observable<Object> {//por ,medio de la url base le voy a enviar un usuario
    return this.httpClient.post(`${this.baseURL}`, usuario);
  }
  actualizarUsuario(id: string, usuario: Usuario): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, usuario);
  }

  getUsuarioById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseURL}/${id}`);
  }

  //PROVICIONL_---------------------------------------------------------
  eliminarUsuario(id: string): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  login(usuario: Usuario): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/login`, usuario);
  }
}
